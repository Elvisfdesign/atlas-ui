import { ProgressIndicator } from '@/components/data-display/ProgressIndicator';
import { confidenceTone } from '@/components/ai/shared/confidenceTone';
import { cn } from '@/utils/cn';

/**
 * Atlas Confidence Indicator.
 * Source: Atlas Product — the Review Queue table's confidence column
 * (a percentage, "92%", beside a 36×5px filled bar) and the Document
 * Review field rows (a percentage beside a small icon chip). Composes
 * Progress Indicator for the bar rather than reimplementing it.
 *
 * Confidence is always shown as a percentage *and* a bar together —
 * never color alone (WCAG 1.4.1) — and the bar's tone shifts by
 * threshold so a low-confidence extraction is visually distinct from a
 * verified one without relying on the number alone either.
 */
export interface ConfidenceIndicatorProps {
  /** 0–100. */
  value: number;
  size?: 'sm' | 'md';
  className?: string;
}

export function ConfidenceIndicator({ value, size = 'md', className }: ConfidenceIndicatorProps) {
  const rounded = Math.round(value);
  const tone = confidenceTone(rounded);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span
        className={cn(
          'w-9 shrink-0 font-sans text-[13px] tabular-nums',
          tone === 'success' && 'text-success-text',
          tone === 'warning' && 'text-warning-text',
          tone === 'danger' && 'text-danger-text'
        )}
      >
        {rounded}%
      </span>
      <ProgressIndicator
        value={rounded}
        tone={tone}
        size={size}
        label={`${rounded}% confidence`}
        className="max-w-9"
      />
    </div>
  );
}
