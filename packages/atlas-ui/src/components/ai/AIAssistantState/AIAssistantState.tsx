import type { ReactNode } from 'react';
import { AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';

export type AIAssistantStateStatus = 'processing' | 'error' | 'empty';

export interface AIAssistantStateProps {
  /** `processing` (default) reads as "the AI is working"; `error`/`empty` let the same block double as an Error or Empty state without three near-identical components. */
  status?: AIAssistantStateStatus;
  /** Overrides the status's default icon. */
  icon?: ReactNode;
  title: string;
  description?: string;
  /** A Button or link — e.g. "Try again", "Ask a question". */
  action?: ReactNode;
  className?: string;
}

const STATUS_ICON = { processing: Loader2, error: AlertCircle, empty: Sparkles } as const;
const STATUS_CLASSES: Record<AIAssistantStateStatus, string> = {
  processing: 'bg-ai-bg text-ai-accent',
  error: 'bg-danger-bg text-danger-text',
  empty: 'bg-ai-bg text-ai-accent',
};

/**
 * Atlas AI Assistant State.
 * Consolidates "AI Processing / Error / Empty State" — named as one item
 * in the component brief — into a single component with a `status` prop,
 * the same pattern Feedback's Empty State uses for Empty/Success/Error:
 * one icon-chip + title + description shape, recolored and re-iconed by
 * status rather than three near-duplicate components. Used inside
 * Assistant Panel's message area while a response is generating, when a
 * request fails, or before the first message is sent.
 */
export function AIAssistantState({
  status = 'processing',
  icon,
  title,
  description,
  action,
  className,
}: AIAssistantStateProps) {
  const Icon = STATUS_ICON[status];

  return (
    <div
      role={status === 'processing' ? 'status' : undefined}
      className={cn('flex flex-col items-center gap-3 px-6 py-12 text-center', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full',
          STATUS_CLASSES[status]
        )}
      >
        {icon ?? <Icon size={20} className={status === 'processing' ? 'animate-spin' : undefined} />}
      </span>
      <div className="flex flex-col gap-1">
        <p className="font-sans text-[14px] font-medium text-primary">{title}</p>
        {description && (
          <p className="max-w-xs font-sans text-[12.5px] leading-relaxed text-secondary">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
