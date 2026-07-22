import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface FieldMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: 'helper' | 'error';
}

/**
 * Shared helper/error text rendered below Input, Textarea, and Select.
 * `error` renders with `role="alert"` so assistive tech announces it as
 * soon as it appears (e.g. after a failed submit), matching how Atlas
 * Product surfaces inline validation.
 */
export function FieldMessage({ className, tone = 'helper', ...props }: FieldMessageProps) {
  return (
    <p
      role={tone === 'error' ? 'alert' : undefined}
      className={cn(
        'mt-1.5 font-sans text-[12.5px] leading-4',
        tone === 'error' ? 'text-danger-text' : 'text-tertiary',
        className
      )}
      {...props}
    />
  );
}
