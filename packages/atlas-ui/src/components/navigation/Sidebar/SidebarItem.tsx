import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Sidebar Item.
 * Source: Atlas Product — the Review Queue sidebar's nav rows (208×35px,
 * 16px icon + label, optional trailing count chip, active item on
 * `interactive-selected` — the same soft-indigo token the Data Table uses
 * for a selected row, so "this is the current one" reads consistently
 * across the whole product).
 */
type SidebarItemOwnProps = {
  icon?: ReactNode;
  active?: boolean;
  count?: string | number;
  children: ReactNode;
};

export type SidebarItemProps = SidebarItemOwnProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>)
  );

export const SidebarItem = forwardRef<HTMLAnchorElement | HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active = false, count, children, href, ...props }, ref) => {
    const sharedClassName = cn(
      'flex h-[35px] w-full items-center gap-2.5 rounded-md px-2.5 font-sans text-[13px] transition-colors',
      active
        ? 'bg-interactive-selected text-interactive-accent font-medium'
        : 'text-secondary hover:bg-surface-subtle hover:text-primary',
      className
    );

    const content = (
      <>
        {icon && (
          <span aria-hidden="true" className="flex shrink-0 items-center justify-center">
            {icon}
          </span>
        )}
        <span className="flex-1 truncate text-left">{children}</span>
        {count !== undefined && (
          <>
            {' '}
            <span
              className={cn(
                'shrink-0 rounded-full px-1.5 py-0.5 text-[11px] font-medium',
                active ? 'bg-surface text-interactive-accent' : 'bg-surface-subtle text-tertiary'
              )}
            >
              {count}
            </span>
          </>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          aria-current={active ? 'page' : undefined}
          className={sharedClassName}
          {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        aria-current={active ? 'page' : undefined}
        className={sharedClassName}
        {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

SidebarItem.displayName = 'SidebarItem';
