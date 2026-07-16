import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Atlas Button.
 * Source: Atlas UI System, 05 — Actions → Action / Button
 * (Type × Size × State variant set, 40 variants).
 */
export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap',
    'font-sans font-medium',
    'rounded-md transition-colors',
    'disabled:pointer-events-none disabled:opacity-40',
    'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-interactive-primary text-surface',
          'hover:bg-interactive-primary-hover',
          'active:bg-interactive-primary-pressed',
        ],
        secondary: [
          'bg-surface text-primary border border-border-default',
          'hover:bg-hover-surface',
          'active:bg-border-subtle',
        ],
        ghost: ['bg-transparent text-primary', 'hover:bg-hover-surface', 'active:bg-border-subtle'],
        destructive: [
          'bg-interactive-danger text-surface',
          'hover:bg-danger-text',
          'active:bg-danger-text',
        ],
      },
      size: {
        small: 'h-[29px] px-2.5 py-1.5 text-[12px] leading-[18px] gap-[5px] rounded-sm',
        medium: 'h-9 px-3.5 py-2.5 text-[13px] leading-[18px] gap-1.5 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  /** Shows a spinner in place of the leading icon and marks the button busy. Interaction is blocked while true, same as `disabled`. */
  loading?: boolean;
  /** Optional leading or trailing icon (a Lucide icon element, sized to match the button). */
  icon?: ReactNode;
  iconPosition?: 'leading' | 'trailing';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'leading',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const iconSize = size === 'small' ? 14 : 16;

    const spinner = <Loader2 aria-hidden="true" size={iconSize} className="animate-spin" />;
    const leading = loading ? spinner : iconPosition === 'leading' ? icon : null;
    const trailing = !loading && iconPosition === 'trailing' ? icon : null;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {leading}
        {children}
        {trailing}
      </button>
    );
  }
);

Button.displayName = 'Button';
