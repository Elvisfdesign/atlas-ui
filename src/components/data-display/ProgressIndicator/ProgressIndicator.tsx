import { cn } from '@/utils/cn';

/**
 * Atlas Progress Indicator.
 * Source: Atlas Product — the Review Queue table's confidence bar
 * (36×5px track, rounded-full, filled proportionally). Generalized here
 * as the neutral-tone base primitive; Confidence Indicator composes this
 * and adds confidence-specific coloring and a percentage label on top.
 */
export interface ProgressIndicatorProps {
  /** 0–100. */
  value: number;
  /** Accessible label — required since the bar alone conveys no text. */
  label: string;
  tone?: 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  className?: string;
}

const TONE_CLASSES: Record<NonNullable<ProgressIndicatorProps['tone']>, string> = {
  accent: 'bg-interactive-accent',
  success: 'bg-success-text',
  warning: 'bg-warning-text',
  danger: 'bg-danger-text',
};

export function ProgressIndicator({
  value,
  label,
  tone = 'accent',
  size = 'md',
  className,
}: ProgressIndicatorProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'w-full overflow-hidden rounded-full bg-surface-subtle',
        size === 'sm' ? 'h-[5px]' : 'h-2',
        className
      )}
    >
      <div
        className={cn('h-full rounded-full transition-[width]', TONE_CLASSES[tone])}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
