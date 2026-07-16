import { cloneElement, forwardRef, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Atlas Icon Button.
 * Source: Atlas UI System, 05 — Actions → Action / Icon Button
 * (Size × State variant set). A single, chromeless variant matches every
 * documented Figma state — Default/Hover/Focus/Pressed/Disabled all share
 * one visual treatment (transparent → tinted on interaction).
 */
export const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center shrink-0',
    'bg-transparent text-primary rounded-md transition-colors',
    'hover:bg-hover-surface active:bg-border-subtle',
    'disabled:pointer-events-none disabled:opacity-40',
    'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
  ],
  {
    variants: {
      size: {
        small: 'h-7 w-7 rounded-sm', // 28px
        medium: 'h-9 w-9 rounded-md', // 36px
      },
    },
    defaultVariants: { size: 'medium' },
  }
);

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  /** A single icon element (e.g. a Lucide icon). Sized automatically to match `size`. */
  icon: ReactElement<{ size?: number }>;
  /** Required — icon-only buttons have no visible label, so an accessible name is mandatory. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, icon, ...props }, ref) => {
    const iconSize = size === 'small' ? 14 : 16;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(iconButtonVariants({ size }), className)}
        {...props}
      >
        <span aria-hidden="true" className="inline-flex">
          {cloneElement(icon, { size: icon.props.size ?? iconSize })}
        </span>
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
