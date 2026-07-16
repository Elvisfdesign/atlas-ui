import type { ReactNode } from 'react';
import { ChartCard } from '@/components/data-display/ChartCard';
import { FileRow } from '@/components/data-display/FileRow';
import { Badge, type BadgeProps } from '@/components/feedback/Badge';
import { cn } from '@/utils/cn';

export interface ActivityFeedItem {
  id: string;
  fileName: string;
  icon?: ReactNode;
  type: string;
  status: string;
  /** Defaults from a reasonable status→tone guess ("Completed" → success, "Failed" → danger, "Review" → warning) — override for anything else. */
  statusTone?: BadgeProps['tone'];
  time: string;
}

export interface ActivityFeedProps {
  title?: string;
  items: ActivityFeedItem[];
  onViewAll?: () => void;
  emptyMessage?: string;
  className?: string;
}

function defaultToneFor(status: string): BadgeProps['tone'] {
  const normalized = status.toLowerCase();
  if (normalized === 'completed') return 'success';
  if (normalized === 'failed') return 'danger';
  if (normalized === 'review') return 'warning';
  if (normalized === 'processing') return 'processing';
  return 'neutral';
}

/**
 * Atlas Activity Feed. Source: Atlas Product's Analytics "Recent
 * Activity" card — a header with a "View all" link, column headers
 * (DOCUMENT/TYPE/STATUS/TIME), and rows composing File Row + a type
 * label + a status Badge + a relative time. Built on Chart Card and
 * File Row rather than reimplementing their layout.
 */
export function ActivityFeed({
  title = 'Recent Activity',
  items,
  onViewAll,
  emptyMessage = 'No recent activity.',
  className,
}: ActivityFeedProps) {
  return (
    <ChartCard
      title={title}
      action={
        onViewAll && (
          <button
            type="button"
            onClick={onViewAll}
            className="whitespace-nowrap font-sans text-[12.5px] font-medium text-interactive-accent transition-colors hover:text-interactive-accent-hover focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2"
          >
            View all
          </button>
        )
      }
      className={className}
    >
      {items.length === 0 ? (
        <p className="py-8 text-center font-sans text-[12.5px] text-tertiary">{emptyMessage}</p>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-start gap-3 pb-2 font-sans text-[10.5px] font-medium uppercase tracking-[0.3px] text-tertiary">
            <span className="min-w-0 flex-1">Document</span>
            <span className="w-28 shrink-0">Type</span>
            <span className="w-24 shrink-0">Status</span>
            <span className="w-16 shrink-0 text-right">Time</span>
          </div>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={cn('flex items-center gap-3 py-3', index > 0 && 'border-t border-border-default')}
            >
              <div className="min-w-0 flex-1">
                <FileRow fileName={item.fileName} icon={item.icon} />
              </div>
              <span className="w-28 shrink-0 truncate font-sans text-[13px] text-primary">{item.type}</span>
              <span className="w-24 shrink-0">
                <Badge tone={item.statusTone ?? defaultToneFor(item.status)}>{item.status}</Badge>
              </span>
              <span className="w-16 shrink-0 text-right font-sans text-[12.5px] text-tertiary">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
}
