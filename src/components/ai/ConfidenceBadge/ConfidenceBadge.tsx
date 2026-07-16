import { AlertCircle, AlertTriangle, Check } from 'lucide-react';
import { confidenceTone } from '@/components/ai/shared/confidenceTone';
import { cn } from '@/utils/cn';

/**
 * Atlas Confidence Badge.
 * Source: Atlas Product — Document Review's Extracted Fields list
 * (`field-row` → `fright`): a percentage beside a small tone-colored
 * circular icon chip, used inline next to a single extracted value.
 *
 * Distinct from Data Display's Confidence Indicator (a percentage +
 * horizontal bar, built for table cells): this is the compact form used
 * beside a single value in a card or list row, where a full bar would be
 * visually heavier than the context needs. Both share the same
 * confidence → tone thresholds.
 */
export interface ConfidenceBadgeProps {
  /** 0–100. */
  value: number;
  className?: string;
}

const TONE_BG: Record<ReturnType<typeof confidenceTone>, string> = {
  success: 'bg-success-bg',
  warning: 'bg-warning-bg',
  danger: 'bg-danger-bg',
};

const TONE_TEXT: Record<ReturnType<typeof confidenceTone>, string> = {
  success: 'text-success-text',
  warning: 'text-warning-text',
  danger: 'text-danger-text',
};

const TONE_ICON = { success: Check, warning: AlertTriangle, danger: AlertCircle } as const;

export function ConfidenceBadge({ value, className }: ConfidenceBadgeProps) {
  const rounded = Math.round(value);
  const tone = confidenceTone(rounded);
  const Icon = TONE_ICON[tone];

  return (
    <span className={cn('inline-flex items-center gap-[5px]', className)}>
      <span className="font-sans text-[11.5px] font-medium text-secondary tabular-nums">
        {rounded}%
      </span>
      <span
        role="img"
        aria-label={`${rounded}% confidence`}
        className={cn(
          'inline-flex size-4 shrink-0 items-center justify-center rounded-full',
          TONE_BG[tone]
        )}
      >
        <Icon aria-hidden="true" size={9} className={TONE_TEXT[tone]} />
      </span>
    </span>
  );
}
