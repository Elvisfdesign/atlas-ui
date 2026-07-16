import { ProgressIndicator } from '@/components/data-display/ProgressIndicator';
import { confidenceTone } from '@/components/ai/shared/confidenceTone';
import { cn } from '@/utils/cn';

/**
 * Atlas Confidence Meter.
 * Not a direct 1:1 Figma frame — synthesized from a real recurring need:
 * Document Review's Approval Panel footer surfaces an aggregate figure
 * ("96% avg. confidence") as plain text with no visualization. Confidence
 * Meter gives that aggregate a standalone, larger-scale visual home (e.g.
 * atop a document's field list or a workflow summary), composing the same
 * Progress Indicator primitive and confidence → tone thresholds as Data
 * Display's Confidence Indicator and AI's Confidence Badge, just sized for
 * standalone display rather than an inline table cell or list row.
 */
export interface ConfidenceMeterProps {
  /** 0–100. */
  value: number;
  /** Caption shown above the bar, e.g. "Overall confidence". */
  label?: string;
  className?: string;
}

export function ConfidenceMeter({
  value,
  label = 'Overall confidence',
  className,
}: ConfidenceMeterProps) {
  const rounded = Math.round(value);
  const tone = confidenceTone(rounded);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-baseline justify-between">
        <span className="font-sans text-[13px] text-secondary">{label}</span>
        <span
          className={cn(
            'font-sans text-2xl font-semibold tabular-nums',
            tone === 'success' && 'text-success-text',
            tone === 'warning' && 'text-warning-text',
            tone === 'danger' && 'text-danger-text'
          )}
        >
          {rounded}%
        </span>
      </div>
      <ProgressIndicator value={rounded} tone={tone} size="md" label={`${label}: ${rounded}%`} />
    </div>
  );
}
