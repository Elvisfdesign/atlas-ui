import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Chart Card.
 * Source: Atlas Product's Analytics screen — the "Processing Over Time"
 * and "Document Types" card shells (20px padding, 14.5px semibold title,
 * an optional header-right slot for a legend or a "View all" link).
 */
export interface ChartCardProps {
  title: string;
  /** Header-right content — a `ChartLegend`, a "View all" link, or any action. */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ title, action, children, className }: ChartCardProps) {
  return (
    <div className={cn('flex flex-col gap-6 rounded-lg border border-border-default bg-surface p-5', className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-sans text-[14.5px] font-semibold text-primary">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}
