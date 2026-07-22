import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { cn } from '@/utils/cn';

/**
 * Atlas Extracted Field Row.
 * Source: Atlas Product — Document Review's Extracted Fields card
 * (`field-row`): a label + value stack on the left, a Confidence Badge on
 * the right. Composes Confidence Badge rather than reimplementing the
 * percentage-and-chip treatment.
 */
export interface ExtractedFieldRowProps {
  label: string;
  value: string;
  /** 0–100. */
  confidence: number;
  className?: string;
}

export function ExtractedFieldRow({ label, value, confidence, className }: ExtractedFieldRowProps) {
  return (
    <div className={cn('flex items-center gap-2 py-2.5', className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-sans text-[11px] text-tertiary">{label}</span>
        <span className="truncate font-sans text-[13px] font-medium text-primary">{value}</span>
      </div>
      <ConfidenceBadge value={confidence} className="shrink-0" />
    </div>
  );
}
