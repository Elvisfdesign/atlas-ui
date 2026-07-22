import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Sidebar.
 * Source: Atlas Product — the app shell's left sidebar (240px fixed
 * width, `background-surface`, right-hand `border-default` divider).
 * Structural shell only — logo, nav sections, and the profile footer are
 * composed as children rather than fixed props, since their content is
 * page-specific.
 */
export const Sidebar = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Primary"
      className={cn(
        'flex h-full w-[240px] shrink-0 flex-col gap-6 border-r border-border-default bg-surface py-6',
        className
      )}
      {...props}
    />
  )
);

Sidebar.displayName = 'Sidebar';

/** Groups a set of `SidebarItem`s, with an optional divider drawn above the section. */
export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  withDivider?: boolean;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, withDivider = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-0.5 px-4',
        withDivider && 'border-t border-border-subtle pt-6',
        className
      )}
      {...props}
    />
  )
);

SidebarSection.displayName = 'SidebarSection';
