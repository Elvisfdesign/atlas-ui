import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { TableContext, useTableDensity, type TableDensity } from './TableContext';

/**
 * Atlas Data Table.
 * Source: Atlas Product — the Review Queue table (header/row/hover/
 * selected/focus states, checkbox selection, sortable Document and
 * Confidence columns, 45px header / 54px rows). Semantic table-* tokens
 * (table-header-background, table-row-hover, table-row-selected, etc.)
 * were established in an earlier design-system pass specifically so the
 * header and first row never visually merge — this component is the
 * React implementation of that hierarchy.
 */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** `comfortable` (default, 54px rows) matches Review Queue. `dense` tightens padding for data-heavy views. */
  density?: TableDensity;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, density = 'comfortable', children, ...props }, ref) => (
    <TableContext.Provider value={{ density }}>
      <div className="w-full overflow-x-auto rounded-lg border border-border-default">
        <table ref={ref} className={cn('w-full border-collapse text-left', className)} {...props}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  )
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('border-b border-table-header-divider bg-table-header-bg', className)}
      {...props}
    />
  )
);
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />
);
TableBody.displayName = 'TableBody';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, ...props }, ref) => (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      className={cn(
        'border-b border-table-row-border bg-table-row-bg transition-colors last:border-b-0',
        'hover:bg-table-row-hover',
        'focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-table-row-focus',
        selected && 'bg-table-row-selected hover:bg-table-row-selected',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  sortDirection?: 'asc' | 'desc' | false;
  onSort?: () => void;
}

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, sortDirection, onSort, children, ...props }, ref) => {
    const density = useTableDensity();
    const sortable = onSort !== undefined;

    const SortIcon = sortDirection === 'asc' ? ChevronUp : sortDirection === 'desc' ? ChevronDown : ChevronsUpDown;

    return (
      <th
        ref={ref}
        scope="col"
        aria-sort={sortDirection ? (sortDirection === 'asc' ? 'ascending' : 'descending') : sortable ? 'none' : undefined}
        className={cn(
          'font-sans text-[10.5px] font-medium uppercase tracking-[0.3px] text-table-header-text',
          density === 'dense' ? 'px-4 py-2' : 'px-4 py-3',
          className
        )}
        {...props}
      >
        {sortable ? (
          <button
            type="button"
            onClick={onSort}
            className={cn(
              'inline-flex items-center gap-1 uppercase tracking-[0.3px]',
              'hover:text-primary focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
              sortDirection && 'text-primary'
            )}
          >
            {children}
            <SortIcon aria-hidden="true" size={11} className="text-table-header-sort-icon" />
          </button>
        ) : (
          children
        )}
      </th>
    );
  }
);
TableHeaderCell.displayName = 'TableHeaderCell';

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => {
    const density = useTableDensity();
    return (
      <td
        ref={ref}
        className={cn(
          'font-sans text-[13px] text-primary',
          density === 'dense' ? 'px-4 py-2' : 'px-4 py-3.5',
          className
        )}
        {...props}
      />
    );
  }
);
TableCell.displayName = 'TableCell';

export interface TableEmptyStateProps {
  colSpan: number;
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function TableEmptyState({ colSpan, icon, title, description }: TableEmptyStateProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-2">
          {icon && (
            <span aria-hidden="true" className="text-tertiary">
              {icon}
            </span>
          )}
          <p className="font-sans text-[13px] font-medium text-primary">{title}</p>
          {description && <p className="font-sans text-[12.5px] text-secondary">{description}</p>}
        </div>
      </td>
    </tr>
  );
}

export interface TableLoadingRowsProps {
  rows?: number;
  columns: number;
}

/** Placeholder rows shown while table data is loading. Uses the same pulse
 * treatment the standalone Skeleton primitive will use once built. */
export function TableLoadingRows({ rows = 5, columns }: TableLoadingRowsProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-table-row-border last:border-b-0" aria-hidden="true">
          {Array.from({ length: columns }, (_, colIndex) => (
            <td key={colIndex} className="px-4 py-3.5">
              <div className="h-3.5 w-full max-w-40 animate-pulse rounded-full bg-surface-subtle" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
