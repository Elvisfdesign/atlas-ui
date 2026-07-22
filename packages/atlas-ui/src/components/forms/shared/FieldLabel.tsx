import type { LabelHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

/**
 * Shared label element for Input, Textarea, and Select — one consistent
 * label style (12.5px, medium weight, `text-secondary`) across every Atlas
 * form field, rather than each component defining its own.
 */
export function FieldLabel({ className, required, children, ...props }: FieldLabelProps) {
  return (
    <label
      className={cn('mb-1.5 block font-sans text-[12.5px] font-medium text-secondary', className)}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="ml-0.5 text-danger-text">
          *
        </span>
      )}
    </label>
  );
}
