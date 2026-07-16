import type { ReactNode } from 'react';
import { File } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas File Row.
 * Source: Atlas Product — the Review Queue table's document cell and the
 * Analytics "Recent Activity" list's document cell (an icon chip + the
 * file name, 28–30px chip depending on context).
 */
export interface FileRowProps {
  fileName: string;
  /** Overrides the default file icon (e.g. a type-specific Lucide icon). */
  icon?: ReactNode;
  /** Secondary line under the file name (e.g. a file size, a page count). */
  meta?: ReactNode;
  className?: string;
}

export function FileRow({ fileName, icon, meta, className }: FileRowProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface-subtle text-tertiary"
      >
        {icon ?? <File size={14} />}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-sans text-[13px] text-primary">{fileName}</span>
        {meta && <span className="truncate font-sans text-[12px] text-tertiary">{meta}</span>}
      </div>
    </div>
  );
}
