import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { useRadioGroup } from './RadioGroupContext';

/**
 * Atlas Radio.
 * Not yet its own componentized node in the Atlas UI System (see the
 * React Readiness matrix) — built as a circular sibling of Checkbox,
 * reusing the exact same border/accent/focus treatment so the two read
 * as one family of selection control rather than two different ones.
 * Reads `name`/selected-value from a wrapping `RadioGroup`; works
 * standalone too if you pass `name`/`checked`/`onChange` directly.
 */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  label?: ReactNode;
  value: string;
  onChange?: (value: string) => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, value, onChange, id, name, checked, disabled, ...props }, ref) => {
    const generatedId = useId();
    const radioId = id ?? generatedId;
    const group = useRadioGroup();

    const resolvedName = name ?? group?.name;
    const resolvedChecked = checked ?? (group ? group.value === value : undefined);

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-center gap-2 font-sans text-[13px] text-primary',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
      >
        <span className="relative inline-flex h-[17px] w-[17px] shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={radioId}
            type="radio"
            name={resolvedName}
            value={value}
            checked={resolvedChecked}
            disabled={disabled}
            onChange={(event) => {
              if (event.target.checked) {
                group?.onValueChange?.(value);
                onChange?.(value);
              }
            }}
            className={cn(
              'peer h-[17px] w-[17px] shrink-0 appearance-none rounded-full border border-border-default bg-surface transition-colors',
              'hover:border-border-strong',
              'checked:border-interactive-accent',
              'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
              'disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-2 w-2 scale-0 rounded-full bg-interactive-accent transition-transform peer-checked:scale-100"
          />
        </span>
        {label}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
