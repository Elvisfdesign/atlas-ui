import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Top Navigation.
 * Source: Atlas Product — the Review Queue topbar (128px content row + a
 * 1px bottom divider, 32px horizontal padding). Structural shell only:
 * the search field, notification trigger, and user menu it contains in
 * Product are each already their own component (Search Input, Icon
 * Button, Avatar) — Top Navigation just lays them out, it doesn't
 * reimplement them.
 */
export const TopNav = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex h-32 shrink-0 items-center justify-between gap-4 border-b border-border-default bg-surface px-8',
        className
      )}
      {...props}
    />
  )
);

TopNav.displayName = 'TopNav';
