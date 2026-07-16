import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '@/utils/cn';

/**
 * Atlas Popover. Source: Atlas Product's Analytics page — the "May 12 –
 * May 18, 2025" date-range button and the "Filters" button in the page
 * header are exactly this pattern: a trigger that opens a small,
 * non-modal floating panel anchored to it, dismissed on outside click
 * or Escape. Built on Radix's Popover primitive (lighter-weight than
 * Modal/Drawer — no focus trap, since it isn't a modal interruption).
 */
export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverClose = RadixPopover.Close;

export type PopoverContentProps = ComponentPropsWithoutRef<typeof RadixPopover.Content>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, sideOffset = 6, align = 'start', ...props }, ref) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          'z-popover rounded-md border border-border-default bg-surface-elevated p-4',
          'shadow-elevation-medium outline-none',
          className
        )}
        {...props}
      />
    </RadixPopover.Portal>
  )
);
PopoverContent.displayName = 'PopoverContent';
