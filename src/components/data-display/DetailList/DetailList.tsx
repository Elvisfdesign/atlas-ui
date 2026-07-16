import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface DetailListItem {
  label: string;
  value: ReactNode;
}

export interface DetailListProps {
  items: DetailListItem[];
  className?: string;
}

/**
 * Atlas Detail List. A plain label/value row list — the non-AI
 * counterpart to Document Review's "Extracted Fields" pattern. Source:
 * the same label-above-value text stack used in every Extracted Field
 * Row (12px tertiary label, 13px primary value), decomposed here into
 * its own primitive without the confidence percentage and AI icon chip
 * that make a field row specifically an AI component. Use Detail List
 * for any plain metadata display (document properties, account details);
 * use the (AI) Extracted Field Row when a value needs a paired
 * confidence score.
 */
export function DetailList({ items, className }: DetailListProps) {
  return (
    <dl className={cn('flex flex-col', className)}>
      {items.map((item, index) => (
        <div
          key={item.label}
          className={cn('flex flex-col gap-1 py-3', index > 0 && 'border-t border-border-default')}
        >
          <dt className="font-sans text-[12px] text-tertiary">{item.label}</dt>
          <dd className="font-sans text-[13px] text-primary">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
