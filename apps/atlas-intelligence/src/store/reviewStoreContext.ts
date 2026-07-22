import { createContext } from 'react';
import type { ReviewDocument, ToastMessage } from '@/types';

export type ResolutionAction = 'Approved' | 'Rejected' | 'Changes Requested';

export interface ReviewStoreValue {
  documents: ReviewDocument[];
  toasts: ToastMessage[];
  approvedThisSession: number;
  getDocument: (id: string) => ReviewDocument | undefined;
  updateField: (docId: string, fieldId: string, value: string) => void;
  resolveDocument: (docId: string, action: ResolutionAction) => void;
  resolveDocuments: (docIds: string[], action: ResolutionAction) => void;
  askAssistant: (docId: string, question: string) => void;
  retryAssistantMessage: (docId: string, messageId: string) => void;
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  dismissToast: (id: string) => void;
}

export const ReviewStoreContext = createContext<ReviewStoreValue | null>(null);
