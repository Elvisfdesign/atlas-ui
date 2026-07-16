import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Switch.
 * Not yet its own componentized node in the Atlas UI System (see the
 * React Readiness matrix) — built from Atlas's motion and accent tokens
 * (a `duration-fast` slide, the same accent used by Checkbox/Radio when
 * checked) as the immediate-effect sibling of Checkbox: reach for Switch
 * when toggling takes effect right away, Checkbox when it's part of a
 * form submitted later.
 */
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    return (
      <label
        htmlFor={switchId}
        className={cn(
          'inline-flex items-center gap-2 font-sans text-[13px] text-primary',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
      >
        <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
          <input
            ref={ref}
            id={switchId}
            type="checkbox"
            role="switch"
            disabled={disabled}
            className={cn(
              'peer h-5 w-9 shrink-0 appearance-none rounded-full border border-border-default bg-surface-subtle transition-colors',
              'checked:border-interactive-accent checked:bg-interactive-accent',
              'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
              'disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0.5 h-4 w-4 rounded-full bg-surface shadow-elevation-low transition-transform duration-fast ease-out-atlas peer-checked:translate-x-4"
          />
        </span>
        {label}
      </label>
    );
  }
);

Switch.displayName = 'Switch';
