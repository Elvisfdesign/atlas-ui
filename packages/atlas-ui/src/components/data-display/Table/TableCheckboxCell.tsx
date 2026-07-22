import type { InputHTMLAttributes } from 'react';
import { Checkbox } from '@/components/forms/Checkbox';
import { useTableDensity } from './TableContext';
import { cn } from '@/utils/cn';

export interface TableCheckboxCellProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  as?: 'th' | 'td';
  'aria-label': string;
  indeterminate?: boolean;
}

/**
 * The selection column, composed directly from the Forms `Checkbox` —
 * matches the Review Queue table's row-selection checkbox exactly rather
 * than reimplementing it.
 */
export function TableCheckboxCell({ as = 'td', className, ...props }: TableCheckboxCellProps) {
  const density = useTableDensity();
  const Cell = as;

  return (
    <Cell className={cn('w-10', density === 'dense' ? 'px-4 py-2' : 'px-4 py-3.5', className)}>
      <Checkbox {...props} />
    </Cell>
  );
}
