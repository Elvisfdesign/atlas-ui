import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldMessage } from '../shared/FieldMessage';

/**
 * Atlas Select.
 * Not yet its own componentized node in the Atlas UI System (see the
 * React Readiness matrix) — implemented as a native `<select>` styled
 * with Input's confirmed chrome, rather than a custom listbox. A native
 * element keeps keyboard, typeahead, and screen-reader behavior correct
 * for free; a fully custom Atlas-styled listbox (matching Dropdown Menu's
 * treatment) is the right upgrade path once that overlay pattern exists.
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      id,
      disabled,
      children,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const messageId = `${selectId}-message`;
    const hasMessage = Boolean(error || helperText);

    return (
      <div className="w-full">
        {label && (
          <FieldLabel htmlFor={selectId} required={required}>
            {label}
          </FieldLabel>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={
              [hasMessage && messageId, ariaDescribedBy].filter(Boolean).join(' ') || undefined
            }
            className={cn(
              'h-9 w-full appearance-none rounded-md border bg-surface pl-3 pr-9 font-sans text-[13px] text-primary outline-none transition-colors',
              'hover:border-border-strong',
              'focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/20',
              'disabled:cursor-not-allowed disabled:text-disabled disabled:opacity-60',
              error ? 'border-danger-text' : 'border-border-default',
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            aria-hidden="true"
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-tertiary"
          />
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

Select.displayName = 'Select';
