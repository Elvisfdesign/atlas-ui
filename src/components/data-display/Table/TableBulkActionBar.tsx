import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface TableBulkActionBarProps {
  /** Number of selected rows — shown as "{count} selected". */
  count: number;
  /** Action buttons/links for the current selection (composition — pass Buttons or Icon Buttons). */
  children: ReactNode;
  className?: string;
}

/**
 * The bar that appears once one or more rows are selected. Source: the
 * `table-bulk-action-*` tokens established alongside the rest of the
 * Table Hierarchy — a high-contrast inverse surface, distinct from every
 * other table surface, so an active bulk action is unmistakable.
 */
export function TableBulkActionBar({ count, children, className }: TableBulkActionBarProps) {
  if (count === 0) return null;

  return (
    <div
      role="toolbar"
      aria-label={`${count} selected`}
      className={cn(
        'flex items-center justify-between gap-4 rounded-lg bg-table-bulk-bg px-4 py-3 text-table-bulk-text',
        className
      )}
    >
      <span className="font-sans text-[13px] font-medium">{count} selected</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
