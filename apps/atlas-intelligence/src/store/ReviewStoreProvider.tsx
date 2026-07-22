import { useCallback, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react';
import { reviewQueue as seedDocuments } from '@/mocks/reviewQueue';
import { notifications as seedNotifications } from '@/mocks/notifications';
import { currentUser } from '@/mocks/user';
import { craftAssistantAnswer } from './assistant';
import { ReviewStoreContext, type ReviewStoreValue, type ResolutionAction } from './reviewStoreContext';
import type {
  ActivityEntry,
  AssistantMessage,
  DocumentStatus,
  ExtractedField,
  NotificationItem,
  ReviewDocument,
  ToastMessage,
} from '@/types';

let uid = 0;
const makeId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${(uid++).toString(36)}`;

interface State {
  documents: ReviewDocument[];
  toasts: ToastMessage[];
  notifications: NotificationItem[];
  /** Documents approved this session — the live delta layered onto the Dashboard's baseline KPI. */
  approvedThisSession: number;
}

type Action =
  | { type: 'UPDATE_FIELD'; docId: string; fieldId: string; value: string }
  | { type: 'RESOLVE'; docId: string; action: ResolutionAction; time: string }
  | { type: 'ADD_ACTIVITY'; docId: string; entry: ActivityEntry }
  | { type: 'ADD_MESSAGE'; docId: string; message: AssistantMessage }
  | { type: 'UPDATE_MESSAGE'; docId: string; messageId: string; patch: Partial<AssistantMessage> }
  | { type: 'TOAST_SHOW'; toast: ToastMessage }
  | { type: 'TOAST_DISMISS'; id: string }
  | { type: 'ADD_NOTIFICATION'; notification: NotificationItem }
  | { type: 'MARK_NOTIFICATION_READ'; id: string };

function recomputeConfidence(fields: ExtractedField[]): number {
  if (fields.length === 0) return 0;
  return Math.round(fields.reduce((sum, f) => sum + f.confidence, 0) / fields.length);
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const documents = state.documents.map((doc) => {
        if (doc.id !== action.docId) return doc;
        const fields = doc.fields.map((f) =>
          f.id === action.fieldId ? { ...f, value: action.value, confidence: 100, edited: true } : f
        );
        return { ...doc, fields, confidence: recomputeConfidence(fields) };
      });
      return { ...state, documents };
    }
    case 'RESOLVE': {
      const status: DocumentStatus = action.action;
      const documents = state.documents.map((doc) =>
        doc.id === action.docId
          ? { ...doc, status, resolution: { action: action.action, by: currentUser.name, time: action.time } }
          : doc
      );
      return {
        ...state,
        documents,
        approvedThisSession: state.approvedThisSession + (action.action === 'Approved' ? 1 : 0),
      };
    }
    case 'ADD_ACTIVITY': {
      const documents = state.documents.map((doc) =>
        doc.id === action.docId ? { ...doc, activity: [action.entry, ...doc.activity] } : doc
      );
      return { ...state, documents };
    }
    case 'ADD_MESSAGE': {
      const documents = state.documents.map((doc) =>
        doc.id === action.docId
          ? { ...doc, assistantMessages: [...doc.assistantMessages, action.message] }
          : doc
      );
      return { ...state, documents };
    }
    case 'UPDATE_MESSAGE': {
      const documents = state.documents.map((doc) => {
        if (doc.id !== action.docId) return doc;
        return {
          ...doc,
          assistantMessages: doc.assistantMessages.map((m) =>
            m.id === action.messageId ? { ...m, ...action.patch } : m
          ),
        };
      });
      return { ...state, documents };
    }
    case 'TOAST_SHOW':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'TOAST_DISMISS':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.notification, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => (n.id === action.id ? { ...n, read: true } : n)),
      };
    default:
      return state;
  }
}

const TOAST_TONE: Record<ResolutionAction, ToastMessage['tone']> = {
  Approved: 'success',
  Rejected: 'danger',
  'Changes Requested': 'warning',
};

const AI_RESPONSE_DELAY = () => 900 + Math.random() * 900;
const AI_FAILURE_RATE = 0.18;

export function ReviewStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    documents: seedDocuments,
    toasts: [],
    notifications: seedNotifications,
    approvedThisSession: 0,
  }));

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const getDocument = useCallback(
    (id: string) => stateRef.current.documents.find((d) => d.id === id),
    []
  );

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    dispatch({ type: 'TOAST_SHOW', toast: { ...toast, id: makeId('t') } });
  }, []);

  const dismissToast = useCallback((id: string) => {
    dispatch({ type: 'TOAST_DISMISS', id });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', id });
  }, []);

  const updateField = useCallback((docId: string, fieldId: string, value: string) => {
    const doc = stateRef.current.documents.find((d) => d.id === docId);
    const field = doc?.fields.find((f) => f.id === fieldId);
    dispatch({ type: 'UPDATE_FIELD', docId, fieldId, value });
    if (field) {
      dispatch({
        type: 'ADD_ACTIVITY',
        docId,
        entry: { id: makeId('a'), message: `${field.label} corrected to "${value}"`, actor: currentUser.name, time: 'Just now' },
      });
    }
  }, []);

  const resolveDocument = useCallback(
    (docId: string, action: ResolutionAction) => {
      const doc = stateRef.current.documents.find((d) => d.id === docId);
      if (!doc) return;
      dispatch({ type: 'RESOLVE', docId, action, time: 'Just now' });
      dispatch({
        type: 'ADD_ACTIVITY',
        docId,
        entry: { id: makeId('a'), message: action, actor: currentUser.name, time: 'Just now' },
      });
      const titleByAction: Record<ResolutionAction, string> = {
        Approved: `${doc.name} approved`,
        Rejected: `${doc.name} rejected`,
        'Changes Requested': `Changes requested on ${doc.name}`,
      };
      const descriptionByAction: Record<ResolutionAction, string> = {
        Approved: 'Moved out of your review queue',
        Rejected: 'Removed from the active queue',
        'Changes Requested': 'Waiting on the assignee to update it',
      };
      showToast({ tone: TOAST_TONE[action], title: titleByAction[action] });
      dispatch({
        type: 'ADD_NOTIFICATION',
        notification: {
          id: makeId('n'),
          title: titleByAction[action],
          description: descriptionByAction[action],
          time: 'Just now',
          read: false,
        },
      });
    },
    [showToast]
  );

  const resolveDocuments = useCallback(
    (docIds: string[], action: ResolutionAction) => {
      if (docIds.length === 0) return;
      for (const docId of docIds) {
        dispatch({ type: 'RESOLVE', docId, action, time: 'Just now' });
        dispatch({
          type: 'ADD_ACTIVITY',
          docId,
          entry: { id: makeId('a'), message: action, actor: currentUser.name, time: 'Just now' },
        });
      }
      const label = docIds.length === 1 ? '1 document' : `${docIds.length} documents`;
      const titleByAction: Record<ResolutionAction, string> = {
        Approved: `${label} approved`,
        Rejected: `${label} rejected`,
        'Changes Requested': `Changes requested on ${label}`,
      };
      showToast({ tone: TOAST_TONE[action], title: titleByAction[action] });
      dispatch({
        type: 'ADD_NOTIFICATION',
        notification: {
          id: makeId('n'),
          title: titleByAction[action],
          time: 'Just now',
          read: false,
        },
      });
    },
    [showToast]
  );

  const runAssistantReply = useCallback((docId: string, messageId: string, question: string) => {
    window.setTimeout(() => {
      const doc = stateRef.current.documents.find((d) => d.id === docId);
      if (!doc) return;
      if (Math.random() < AI_FAILURE_RATE) {
        dispatch({
          type: 'UPDATE_MESSAGE',
          docId,
          messageId,
          patch: { status: 'error', content: "Sorry, I couldn't process that just now." },
        });
        return;
      }
      const { content, evidence } = craftAssistantAnswer(question, doc);
      dispatch({ type: 'UPDATE_MESSAGE', docId, messageId, patch: { status: 'sent', content, evidence } });
    }, AI_RESPONSE_DELAY());
  }, []);

  const askAssistant = useCallback(
    (docId: string, question: string) => {
      dispatch({
        type: 'ADD_MESSAGE',
        docId,
        message: { id: makeId('m'), role: 'user', content: question, status: 'sent' },
      });
      const pendingId = makeId('m');
      dispatch({
        type: 'ADD_MESSAGE',
        docId,
        message: { id: pendingId, role: 'assistant', content: '', status: 'sending' },
      });
      runAssistantReply(docId, pendingId, question);
    },
    [runAssistantReply]
  );

  const retryAssistantMessage = useCallback(
    (docId: string, messageId: string) => {
      const doc = stateRef.current.documents.find((d) => d.id === docId);
      if (!doc) return;
      const idx = doc.assistantMessages.findIndex((m) => m.id === messageId);
      const question = doc.assistantMessages
        .slice(0, idx)
        .reverse()
        .find((m) => m.role === 'user')?.content;
      if (!question) return;
      dispatch({ type: 'UPDATE_MESSAGE', docId, messageId, patch: { status: 'sending', content: '' } });
      runAssistantReply(docId, messageId, question);
    },
    [runAssistantReply]
  );

  const value = useMemo<ReviewStoreValue>(
    () => ({
      documents: state.documents,
      toasts: state.toasts,
      notifications: state.notifications,
      approvedThisSession: state.approvedThisSession,
      getDocument,
      updateField,
      resolveDocument,
      resolveDocuments,
      askAssistant,
      retryAssistantMessage,
      showToast,
      dismissToast,
      markNotificationRead,
    }),
    [
      state,
      getDocument,
      updateField,
      resolveDocument,
      resolveDocuments,
      askAssistant,
      retryAssistantMessage,
      showToast,
      dismissToast,
      markNotificationRead,
    ]
  );

  return <ReviewStoreContext.Provider value={value}>{children}</ReviewStoreContext.Provider>;
}
