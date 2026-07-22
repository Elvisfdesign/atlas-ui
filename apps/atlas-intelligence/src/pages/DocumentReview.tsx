import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  AISuggestionCard,
  ApprovalPanel,
  AssistantPanel,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ExtractedFieldRow,
  IconButton,
  Skeleton,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  cn,
  type AssistantMessage as PanelMessage,
} from 'atlas-ui';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { useReviewStore } from '@/store/useReviewStore';
import type { DocumentStatus, ReviewDocument } from '@/types';

const STATUS_TONE: Record<DocumentStatus, 'review' | 'processing' | 'success' | 'danger' | 'warning'> = {
  Review: 'review',
  Processing: 'processing',
  Approved: 'success',
  Rejected: 'danger',
  'Changes Requested': 'warning',
};

const SUGGESTED_PROMPTS = [
  'Summarize this document',
  'Check for anomalies',
  'Compare with previous invoices',
  "What's the payment status?",
];

const LOW_CONFIDENCE_THRESHOLD = 80;
const RESOLUTION_MESSAGES = ['Approved', 'Rejected', 'Changes Requested'];
const LOADING_DELAY_MS = 450;

const TABS = ['Extracted Data', 'Document', 'Activity', 'History'] as const;

function TypingIndicator() {
  return (
    <span role="status" aria-label="Assistant is typing" className="inline-flex items-center gap-1 py-1">
      {[0, 150, 300].map((delay) => (
        <span
          key={delay}
          className="h-1.5 w-1.5 animate-typing-dot rounded-full bg-tertiary motion-reduce:animate-none"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  );
}

function AnswerContent({ text, evidence }: { text: string; evidence?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span>{text}</span>
      {evidence && (
        <span className="inline-flex w-fit items-center gap-1 rounded-full bg-surface px-2 py-0.5 font-sans text-[10.5px] text-tertiary">
          <FileText size={10} aria-hidden="true" />
          {evidence}
        </span>
      )}
    </div>
  );
}

function ErrorContent({ text, onRetry }: { text: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-danger-text">{text}</span>
      <Button variant="secondary" size="small" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

/** Looks up the document from the route param and hands off to the keyed
 * view below — keying by `doc.id` guarantees every piece of per-document UI
 * state (open tab, zoom, dismissed suggestion, loading) resets on its own
 * when the reviewer moves to a different document, instead of leaking
 * across documents (React Router doesn't remount on a param-only
 * navigation) or needing an effect to manually reset it. */
export function DocumentReview() {
  const navigate = useNavigate();
  const { documentId = '' } = useParams();
  const { documents, updateField, resolveDocument, askAssistant, retryAssistantMessage } = useReviewStore();

  const index = documents.findIndex((d) => d.id === decodeURIComponent(documentId));
  const doc = index >= 0 ? documents[index] : documents[0];

  return (
    <DocumentReviewView
      key={doc.id}
      doc={doc}
      index={index}
      documentIds={documents.map((d) => d.id)}
      onNavigate={(path) => navigate(path)}
      updateField={updateField}
      resolveDocument={resolveDocument}
      askAssistant={askAssistant}
      retryAssistantMessage={retryAssistantMessage}
    />
  );
}

interface DocumentReviewViewProps {
  doc: ReviewDocument;
  index: number;
  /** Every document's id, in list order — enough to compute the prev/next target without holding the full documents array. */
  documentIds: string[];
  onNavigate: (path: string) => void;
  updateField: (docId: string, fieldId: string, value: string) => void;
  resolveDocument: (docId: string, action: 'Approved' | 'Rejected' | 'Changes Requested') => void;
  askAssistant: (docId: string, question: string) => void;
  retryAssistantMessage: (docId: string, messageId: string) => void;
}

function DocumentReviewView({
  doc,
  index,
  documentIds,
  onNavigate,
  updateField,
  resolveDocument,
  askAssistant,
  retryAssistantMessage,
}: DocumentReviewViewProps) {
  const total = documentIds.length;
  const [tab, setTab] = useState<(typeof TABS)[number]>('Extracted Data');
  const [zoom, setZoom] = useState(100);
  const [dismissedSuggestion, setDismissedSuggestion] = useState(false);
  const isResolved = Boolean(doc.resolution);

  // A brief, honest loading moment when opening a document — real apps
  // fetch document detail per-record, and a skeleton here avoids an
  // instant, jarring swap between two different documents' data. Resets
  // for free on every document because this whole component is remounted
  // (keyed by doc.id) rather than reset via an effect.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOADING_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const lowestField = useMemo(
    () => [...doc.fields].sort((a, b) => a.confidence - b.confidence)[0],
    [doc.fields]
  );
  const showSuggestion =
    !isResolved && !dismissedSuggestion && lowestField && lowestField.confidence < LOW_CONFIDENCE_THRESHOLD;

  function goToOffset(offset: number) {
    const nextIndex = (index + offset + total) % total;
    onNavigate(`/review-queue/${encodeURIComponent(documentIds[nextIndex])}`);
  }

  const displayMessages: PanelMessage[] = doc.assistantMessages.map((m) => {
    if (m.status === 'sending') return { id: m.id, role: m.role, content: <TypingIndicator /> };
    if (m.status === 'error') {
      return {
        id: m.id,
        role: m.role,
        content: <ErrorContent text={m.content} onRetry={() => retryAssistantMessage(doc.id, m.id)} />,
      };
    }
    if (m.role === 'assistant' && m.evidence) {
      return { id: m.id, role: m.role, content: <AnswerContent text={m.content} evidence={m.evidence} /> };
    }
    return { id: m.id, role: m.role, content: m.content };
  });

  const activityEntries = doc.activity;
  const historyEntries = doc.activity.filter((entry) => RESOLUTION_MESSAGES.includes(entry.message));

  function handleResolve(action: 'Approved' | 'Rejected' | 'Changes Requested') {
    resolveDocument(doc.id, action);
    onNavigate('/review-queue');
  }

  return (
    <div className="flex min-h-full flex-col px-8 py-6">
      <Breadcrumb className="mb-2">
        <BreadcrumbItem href="/review-queue">Review Queue</BreadcrumbItem>
        <BreadcrumbItem current>{doc.name}</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
        <div className="flex items-center gap-3">
          <IconButton
            icon={<ArrowLeft />}
            aria-label="Back to Review Queue"
            onClick={() => onNavigate('/review-queue')}
          />
          <h1 className="font-sans text-xl font-semibold text-primary">{doc.name}</h1>
          <Badge tone={STATUS_TONE[doc.status]}>{doc.status}</Badge>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center gap-1 font-sans text-[12.5px] text-secondary">
            <IconButton
              icon={<ChevronLeft />}
              aria-label="Previous document"
              size="small"
              onClick={() => goToOffset(-1)}
            />
            <span>
              {index + 1} of {total}
            </span>
            <IconButton
              icon={<ChevronRight />}
              aria-label="Next document"
              size="small"
              onClick={() => goToOffset(1)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem icon={<Download size={14} />}>Download original</DropdownMenuItem>
              <DropdownMenuItem icon={<Trash2 size={14} />} destructive>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(value) => setTab(value as (typeof TABS)[number])}>
        <TabsList>
          {TABS.map((t) => (
            <Tab key={t} value={t}>
              {t}
            </Tab>
          ))}
        </TabsList>

        <TabPanel value="Extracted Data">
          {isLoading ? (
            <div
              className="grid grid-cols-1 gap-5 pt-5 lg:grid-cols-[1.1fr_1fr_1fr]"
              role="status"
              aria-label={`Loading ${doc.name}`}
            >
              <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface-subtle p-5">
                <Skeleton variant="rect" className="mx-auto h-80 w-full max-w-xs" />
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-border-default bg-surface p-5">
                <Skeleton variant="text" width="40%" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 py-1">
                    <Skeleton variant="text" width="35%" />
                    <Skeleton variant="text" width="20%" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface p-5">
                <Skeleton variant="text" width="50%" />
                <Skeleton variant="rect" className="h-16 w-full" />
                <Skeleton variant="rect" className="h-9 w-full" />
                <Skeleton variant="rect" className="h-9 w-full" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 pt-5 lg:grid-cols-[1.1fr_1fr_1fr]">
              <div className="flex flex-col gap-3 rounded-xl border border-border-default bg-surface-subtle p-5">
                <div
                  className="mx-auto flex max-w-xs flex-col gap-4 rounded-lg border border-border-default bg-surface p-5 transition-transform duration-normal"
                  style={{ transform: `scale(${zoom / 100})` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-sans text-[13px] font-semibold text-primary">ACME CORPORATION</p>
                      <p className="truncate font-sans text-[10.5px] text-tertiary">123 Market Street, San Francisco, CA</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-sans text-[13px] font-semibold text-primary">
                        {doc.type.toUpperCase()}
                      </p>
                      <p className="truncate font-sans text-[10.5px] text-tertiary">{doc.id}</p>
                    </div>
                  </div>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2.5 rounded-full bg-border-subtle"
                      style={{ width: `${70 + (i % 3) * 10}%` }}
                    />
                  ))}
                  <div className="flex items-center justify-between border-t border-border-default pt-3">
                    <span className="font-sans text-[11px] text-tertiary">TOTAL DUE</span>
                    <span className="font-sans text-[15px] font-semibold text-primary">
                      {doc.fields.find((f) => /total|amount/i.test(f.label))?.value ?? '—'}
                    </span>
                  </div>
                </div>
                <div className="mx-auto flex items-center gap-2">
                  <IconButton
                    icon={<Minus />}
                    size="small"
                    aria-label="Zoom out"
                    disabled={zoom <= 50}
                    onClick={() => setZoom((z) => Math.max(50, z - 10))}
                  />
                  <span className="w-10 text-center font-sans text-[12.5px] text-secondary">{zoom}%</span>
                  <IconButton
                    icon={<Plus />}
                    size="small"
                    aria-label="Zoom in"
                    disabled={zoom >= 150}
                    onClick={() => setZoom((z) => Math.min(150, z + 10))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-border-default bg-surface p-5">
                  <h2 className="mb-1 font-sans text-[14.5px] font-semibold text-primary">Extracted Fields</h2>
                  <div className="flex flex-col divide-y divide-border-default">
                    {doc.fields.map((field) => (
                      <div
                        key={field.id}
                        className={cn(
                          field.confidence < LOW_CONFIDENCE_THRESHOLD && 'rounded-md bg-warning-bg/40 px-2'
                        )}
                      >
                        <ExtractedFieldRow
                          label={field.label}
                          value={field.value}
                          confidence={field.confidence}
                          editable={!isResolved}
                          onSave={(value) => updateField(doc.id, field.id, value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {showSuggestion && lowestField && (
                  <AISuggestionCard
                    description={`${lowestField.label} has low extraction confidence — confirm it's correct`}
                    suggestedValue={lowestField.value}
                    confidence={lowestField.confidence}
                    onAccept={() => {
                      updateField(doc.id, lowestField.id, lowestField.value);
                      setDismissedSuggestion(true);
                    }}
                    onReject={() => setDismissedSuggestion(true)}
                  />
                )}
              </div>

              <AssistantPanel
                messages={displayMessages}
                suggestedPrompts={SUGGESTED_PROMPTS}
                onSuggestedPromptClick={(prompt) => askAssistant(doc.id, prompt)}
                onSubmit={(value) => askAssistant(doc.id, value)}
              />
            </div>
          )}
        </TabPanel>

        <TabPanel value="Document">
          <p className="py-16 text-center font-sans text-[13px] text-tertiary">
            Full document viewer is a future-phase build — see the Extracted Data tab for the mock preview.
          </p>
        </TabPanel>

        <TabPanel value="Activity">
          <div className="flex max-w-2xl flex-col divide-y divide-border-default pt-5">
            {activityEntries.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 py-3">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-interactive-accent" />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-sans text-[13px] text-primary">{entry.message}</span>
                  <span className="font-sans text-[11.5px] text-tertiary">
                    {entry.actor} · {entry.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel value="History">
          <div className="max-w-2xl pt-5">
            {historyEntries.length === 0 ? (
              <p className="py-16 text-center font-sans text-[13px] text-tertiary">
                No status changes yet — this document is still open.
              </p>
            ) : (
              <div className="flex flex-col divide-y divide-border-default">
                {historyEntries.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-3 py-3">
                    <Badge tone={STATUS_TONE[entry.message as DocumentStatus] ?? 'review'}>{entry.message}</Badge>
                    <span className="font-sans text-[12.5px] text-tertiary">
                      {entry.actor} · {entry.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>

      <div className="mt-auto">
        {isResolved && doc.resolution ? (
          <div className="flex items-center gap-3 border-t border-border-subtle py-4">
            <Badge tone={STATUS_TONE[doc.status]}>{doc.resolution.action}</Badge>
            <p className="font-sans text-[12.5px] text-tertiary">
              by {doc.resolution.by} · {doc.resolution.time}
            </p>
          </div>
        ) : (
          <ApprovalPanel
            summary={`${doc.fields.filter((f) => f.confidence >= LOW_CONFIDENCE_THRESHOLD || f.edited).length} of ${doc.fields.length} fields verified · ${doc.confidence}% avg. confidence`}
            onReject={() => handleResolve('Rejected')}
            onRequestChanges={() => handleResolve('Changes Requested')}
            onApprove={() => handleResolve('Approved')}
          />
        )}
      </div>
    </div>
  );
}
