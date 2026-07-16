import type { ReactNode } from 'react';
import { AlertCircle, Check, Inbox } from 'lucide-react';
import { cn } from '@/utils/cn';

export type EmptyStateTone = 'neutral' | 'success' | 'danger';

export interface EmptyStateProps {
  /** `neutral` (default) reads as an empty-results state; `success`/`danger` let the same block double as a Success/Error state without a separate component. */
  tone?: EmptyStateTone;
  /** Overrides the tone's default icon. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** A Button or link — e.g. "Clear filters", "Try again", "Create workflow". */
  action?: ReactNode;
  className?: string;
}

const TONE_ICON = { neutral: Inbox, success: Check, danger: AlertCircle } as const;
const TONE_CLASSES: Record<EmptyStateTone, string> = {
  neutral: 'bg-surface-subtle text-tertiary',
  success: 'bg-success-bg text-success-text',
  danger: 'bg-danger-bg text-danger-text',
};

/**
 * Atlas Empty State. Source: the same icon-chip + title + description
 * shape as Table's `TableEmptyState`, generalized here into a standalone,
 * block-level component for use outside a table (an empty page section,
 * a zero-results search, or — via `tone` — a Success or Error state), so
 * the three don't need three near-identical components.
 */
export function EmptyState({ tone = 'neutral', icon, title, description, action, className }: EmptyStateProps) {
  const Icon = TONE_ICON[tone];

  return (
    <div className={cn('flex flex-col items-center gap-3 px-6 py-16 text-center', className)}>
      <span
        aria-hidden="true"
        className={cn('flex h-11 w-11 items-center justify-center rounded-full', TONE_CLASSES[tone])}
      >
        {icon ?? <Icon size={20} />}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[14px] font-medium text-primary">{title}</p>
        {description && (
          <p className="max-w-xs font-sans text-[12.5px] leading-relaxed text-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
