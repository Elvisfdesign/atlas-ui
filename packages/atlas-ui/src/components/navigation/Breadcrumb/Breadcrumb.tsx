import {
  Children,
  Fragment,
  isValidElement,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Breadcrumb.
 * Source: Atlas Product — the Review Queue page's "Home / Review Queue"
 * crumb (12.5px body-small text, `/` separator, current page not a link).
 * The `/` separator is inserted automatically between children — callers
 * just list `BreadcrumbItem`s, they don't place separators by hand.
 */
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <nav aria-label="Breadcrumb" className={className} {...props}>
      <ol className="flex items-center gap-1.5 font-sans text-[12.5px]">
        {items.map((item, index) => (
          <Fragment key={item.key ?? index}>
            {item}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

export interface BreadcrumbItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href?: string;
  /** Marks this as the current page — rendered as plain text, not a link, with `aria-current="page"`. */
  current?: boolean;
  children: ReactNode;
}

export function BreadcrumbItem({
  href,
  current = false,
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li className="flex items-center">
      {href && !current ? (
        <a
          href={href}
          className={cn('text-tertiary transition-colors hover:text-primary', className)}
          {...props}
        >
          {children}
        </a>
      ) : (
        <span
          aria-current={current ? 'page' : undefined}
          className={cn('text-primary', className)}
        >
          {children}
        </span>
      )}
    </li>
  );
}

function BreadcrumbSeparator() {
  return (
    <span aria-hidden="true" className="text-tertiary">
      /
    </span>
  );
}
