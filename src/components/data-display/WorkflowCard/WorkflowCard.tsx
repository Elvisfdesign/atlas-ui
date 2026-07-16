import { Badge, type BadgeProps } from '@/components/feedback/Badge';
import { cn } from '@/utils/cn';

/**
 * Atlas Workflow Card.
 * Source: Atlas Product — the Workflow Builder's pipeline cards (title +
 * status badge, a one-line description, and a metrics row: a volume
 * count and a success percentage separated by "·").
 */
export interface WorkflowCardProps {
  title: string;
  description: string;
  status: string;
  /** Maps `status` to a Badge tone — defaults to a reasonable guess ("Active" → success, "Draft" → draft) but can be overridden. */
  statusTone?: BadgeProps['tone'];
  /** Volume processed (e.g. "1,245"). Omit along with `successRate` for workflows with no activity yet. */
  volume?: string;
  successRate?: string;
  onClick?: () => void;
  className?: string;
}

function defaultToneFor(status: string): BadgeProps['tone'] {
  const normalized = status.toLowerCase();
  if (normalized === 'active') return 'success';
  if (normalized === 'draft') return 'draft';
  if (normalized === 'scheduled') return 'info';
  if (normalized === 'archived') return 'neutral';
  return 'neutral';
}

export function WorkflowCard({
  title,
  description,
  status,
  statusTone,
  volume,
  successRate,
  onClick,
  className,
}: WorkflowCardProps) {
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex w-full flex-col gap-2.5 rounded-lg border border-border-default bg-surface p-3.5 text-left transition-colors',
        onClick && 'cursor-pointer hover:border-border-strong',
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-sans text-[13px] font-medium text-primary">{title}</span>
        <Badge tone={statusTone ?? defaultToneFor(status)}>{status}</Badge>
      </div>
      <p className="font-sans text-[12px] text-tertiary">{description}</p>
      {(volume ?? successRate) && (
        <div className="flex items-center gap-1.5 font-sans text-[12px] text-secondary">
          <span>{volume ?? '0'}</span>
          <span aria-hidden="true" className="text-tertiary">
            ·
          </span>
          <span>{successRate ?? '—'}</span>
        </div>
      )}
    </Component>
  );
}
