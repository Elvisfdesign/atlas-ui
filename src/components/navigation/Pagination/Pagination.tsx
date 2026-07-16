import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { IconButton } from '@/components/actions/IconButton';

/**
 * Atlas Pagination.
 * Source: Atlas Product — the Review Queue table's pager ("Showing 1 to
 * 10 of 12 results" + prev/page-number/next controls, 28px controls).
 * Prev/next are composed from Icon Button rather than reimplemented.
 */
export interface PaginationProps {
  /** Current page, 1-indexed. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Drives the "Showing X to Y of Z results" summary text. Omit to hide the summary. */
  itemRange?: { from: number; to: number; total: number };
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, itemRange, className }: PaginationProps) {
  // Small page counts (Atlas Product's tables today) — show every page.
  // Keeps the control simple rather than building ellipsis truncation for
  // a case Product doesn't currently have.
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-between gap-4 px-4 py-3.5', className)}
    >
      {itemRange && (
        <p className="font-sans text-[13px] text-secondary">
          Showing {itemRange.from} to {itemRange.to} of {itemRange.total} results
        </p>
      )}
      <div className="flex items-center gap-1">
        <IconButton
          icon={<ChevronLeft />}
          aria-label="Previous page"
          size="small"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            aria-current={p === page ? 'page' : undefined}
            onClick={() => onPageChange(p)}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-sm font-sans text-[12.5px] transition-colors',
              p === page
                ? 'bg-surface-subtle font-semibold text-primary'
                : 'text-secondary hover:bg-surface-subtle'
            )}
          >
            {p}
          </button>
        ))}
        <IconButton
          icon={<ChevronRight />}
          aria-label="Next page"
          size="small"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </nav>
  );
}
