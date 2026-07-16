import { cn } from '@/utils/cn';

export type StatusIndicatorTone = 'success' | 'neutral' | 'warning' | 'danger';

export interface StatusIndicatorProps {
  /** Visible label, e.g. "Online", "Away", "Offline". */
  label: string;
  tone?: StatusIndicatorTone;
  size?: 'sm' | 'md';
  className?: string;
}

const TONE_DOT_CLASSES: Record<StatusIndicatorTone, string> = {
  success: 'bg-success-text',
  neutral: 'bg-tertiary',
  warning: 'bg-warning-text',
  danger: 'bg-danger-text',
};

/**
 * Atlas Status Indicator. A dot + label pairing for a live/connection
 * status (a user's online state, a workflow's connection health) —
 * distinct from Badge, which is for categorical/process state pills.
 * Status is always paired with a text label, never the dot alone.
 */
export function StatusIndicator({ label, tone = 'neutral', size = 'md', className }: StatusIndicatorProps) {
  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'shrink-0 rounded-full',
          size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2',
          TONE_DOT_CLASSES[tone]
        )}
      />
      <span className={cn('font-sans text-secondary', size === 'sm' ? 'text-[11.5px]' : 'text-[12.5px]')}>
        {label}
      </span>
    </div>
  );
}
