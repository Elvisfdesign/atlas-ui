import { Check } from 'lucide-react';
import { Button } from '@/components/actions/Button';
import { cn } from '@/utils/cn';

/**
 * Atlas Approval Panel.
 * Source: Atlas Product — Document Review's `action-footer`: a summary
 * line ("7 of 7 fields extracted · 96% avg. confidence") beside Reject /
 * Request Changes / Approve & Continue actions. Composes Button for all
 * three actions rather than reimplementing button styling.
 */
export interface ApprovalPanelProps {
  /** e.g. "7 of 7 fields extracted · 96% avg. confidence". */
  summary: string;
  onReject?: () => void;
  onRequestChanges?: () => void;
  onApprove?: () => void;
  approveLabel?: string;
  /** Disables all actions and shows a busy state on the primary action. */
  loading?: boolean;
  className?: string;
}

export function ApprovalPanel({
  summary,
  onReject,
  onRequestChanges,
  onApprove,
  approveLabel = 'Approve & Continue',
  loading = false,
  className,
}: ApprovalPanelProps) {
  return (
    <div className={cn('flex items-center gap-3 border-t border-border-subtle py-4', className)}>
      <p className="flex-1 font-sans text-[12.5px] text-tertiary">{summary}</p>
      {onReject && (
        <Button
          variant="ghost"
          size="medium"
          onClick={onReject}
          disabled={loading}
          className="text-danger-text hover:bg-danger-bg active:bg-danger-bg"
        >
          Reject
        </Button>
      )}
      {onRequestChanges && (
        <Button variant="ghost" size="medium" onClick={onRequestChanges} disabled={loading}>
          Request Changes
        </Button>
      )}
      <Button
        variant="primary"
        size="medium"
        icon={<Check size={15} />}
        onClick={onApprove}
        loading={loading}
      >
        {approveLabel}
      </Button>
    </div>
  );
}
