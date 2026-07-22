import type { ComponentType } from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ size?: number }>;
  /** Optional trailing count chip, e.g. Review Queue's open-item count. */
  count?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
}

export type WorkflowStatus = 'Active' | 'Processing' | 'Review';

export interface WorkflowSummary {
  id: string;
  name: string;
  status: WorkflowStatus;
  items: number;
  accuracy: string;
  updated: string;
}

export type DocumentType = 'Invoice' | 'Contract' | 'Receipt';
/** `Review`/`Processing` are open (pending) states; the rest are terminal —
 * reached only through a reviewer's explicit decision, never automatically. */
export type DocumentStatus = 'Review' | 'Processing' | 'Approved' | 'Rejected' | 'Changes Requested';

export interface ExtractedField {
  id: string;
  label: string;
  value: string;
  confidence: number;
  /** True once a reviewer has corrected this field's original AI value. */
  edited?: boolean;
}

export interface ActivityEntry {
  id: string;
  message: string;
  actor: string;
  time: string;
}

export type AssistantMessageStatus = 'sending' | 'sent' | 'error';

export interface AssistantMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  status?: AssistantMessageStatus;
  /** Which extracted field (if any) grounds this answer — shown as a small citation. */
  evidence?: string;
}

export interface ReviewDocument {
  id: string;
  name: string;
  type: DocumentType;
  status: DocumentStatus;
  /** Overall confidence — average of `fields[].confidence`, recomputed after edits. */
  confidence: number;
  assignee: { name: string };
  uploaded: string;
  /** Minutes-ago at mock-data-authoring time — powers Uploaded column sort without needing real timestamps. */
  uploadedMinutesAgo: number;
  fields: ExtractedField[];
  activity: ActivityEntry[];
  assistantMessages: AssistantMessage[];
  /** Set once the document reaches a terminal status. */
  resolution?: { action: 'Approved' | 'Rejected' | 'Changes Requested'; by: string; time: string };
}

export interface KpiSummary {
  label: string;
  value: string;
  trend: 'positive' | 'negative';
  trendValue: string;
  subtext: string;
}

export interface ActivityPoint {
  [key: string]: string | number;
  date: string;
  processed: number;
  failed: number;
}

export type ToastTone = 'success' | 'danger' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  tone: ToastTone;
  title: string;
  description?: string;
}
