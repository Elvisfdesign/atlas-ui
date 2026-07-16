import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldMessage } from '../shared/FieldMessage';

/**
 * Atlas Input.
 * Source: Atlas UI System, Forms → Form / Text Input (a 6-state variant
 * set: default, hover, focus, filled, disabled, error). This implementation
 * covers all six through native/CSS states (`:hover`, `:focus-within`,
 * `:disabled`) plus the `error` prop, rather than a `state` prop — a real
 * input's state is a consequence of user interaction and validation, not
 * something a caller sets directly.
 */
const inputShellVariants = cva(
  [
    'flex items-center gap-2 rounded-md border bg-surface transition-colors',
    'has-[input:hover]:border-border-strong',
    'has-[input:focus-visible]:border-border-focus has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-border-focus/20',
    'has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-60',
  ],
  {
    variants: {
      size: {
        small: 'h-[29px] px-2.5 text-[12px]',
        medium: 'h-9 px-3',
      },
      error: {
        true: 'border-danger-text',
        false: 'border-border-default',
      },
    },
    defaultVariants: { size: 'medium', error: false },
  }
);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputShellVariants>, 'error'> {
  /** Field label, rendered above the input and associated via `htmlFor`. */
  label?: string;
  /** Error message. Presence alone puts the field in its error state. */
  error?: string;
  /** Helper text shown when there is no error. */
  helperText?: string;
  /** Icon rendered at the start of the field (e.g. Search). Decorative — always `aria-hidden`. */
  leadingIcon?: ReactNode;
  /** Icon or short content rendered at the end of the field (e.g. a unit, a keyboard shortcut). */
  trailingContent?: ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      label,
      error,
      helperText,
      leadingIcon,
      trailingContent,
      required,
      disabled,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;
    const hasMessage = Boolean(error || helperText);

    return (
      <div className="w-full">
        {label && (
          <FieldLabel htmlFor={inputId} required={required}>
            {label}
          </FieldLabel>
        )}
        <div className={cn(inputShellVariants({ size, error: Boolean(error) }), className)}>
          {leadingIcon && (
            <span aria-hidden="true" className="flex shrink-0 items-center text-tertiary">
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={
              [hasMessage && messageId, ariaDescribedBy].filter(Boolean).join(' ') || undefined
            }
            className={cn(
              'w-full min-w-0 bg-transparent font-sans text-primary outline-none',
              'placeholder:text-tertiary',
              'disabled:cursor-not-allowed disabled:text-disabled'
            )}
            {...props}
          />
          {trailingContent && (
            <span className="flex shrink-0 items-center text-tertiary">{trailingContent}</span>
          )}
        </div>
        {hasMessage && (
          <FieldMessage id={messageId} tone={error ? 'error' : 'helper'}>
            {error ?? helperText}
          </FieldMessage>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
