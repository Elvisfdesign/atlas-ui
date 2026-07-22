import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { FieldLabel } from '../shared/FieldLabel';
import { FieldMessage } from '../shared/FieldMessage';

/**
 * Atlas Textarea.
 * Not yet its own componentized node in the Atlas UI System (see the
 * React Readiness matrix) — built as a direct multi-line extension of
 * Input's confirmed chrome (Form / Text Input: border, radius, type
 * scale, focus ring, error/disabled treatment), rather than a new visual
 * language, since Atlas Product doesn't show a distinct textarea style.
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      id,
      rows = 4,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const messageId = `${textareaId}-message`;
    const hasMessage = Boolean(error || helperText);

    return (
      <div className="w-full">
        {label && (
          <FieldLabel htmlFor={textareaId} required={required}>
            {label}
          </FieldLabel>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={
            [hasMessage && messageId, ariaDescribedBy].filter(Boolean).join(' ') || undefined
          }
          className={cn(
            'w-full resize-y rounded-md border bg-surface px-3 py-2 font-sans text-[13px] text-primary outline-none transition-colors',
            'placeholder:text-tertiary',
            'hover:border-border-strong',
            'focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/20',
            'disabled:cursor-not-allowed disabled:text-disabled disabled:opacity-60',
            error ? 'border-danger-text' : 'border-border-default',
            className
          )}
          {...props}
        />
        {hasMessage && (
          <FieldMessage id={messageId} tone={error ? 'error' : 'helper'}>
            {error ?? helperText}
          </FieldMessage>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
