import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type MutableRefObject,
  type ReactNode,
  type Ref,
} from 'react';
import { Check, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas Checkbox.
 * Source: Atlas Product — the Review Queue table's row-selection checkbox
 * (17×17px, rounded-xs, checked state fills with the accent color and
 * shows a white check). Built on a real native `<input type="checkbox">`
 * (visually restyled via `appearance-none`) rather than a custom
 * button-based widget, so checked/indeterminate state, labeling, and
 * keyboard behavior all come from the browser.
 */
function useMergedRef<T>(...refs: Array<Ref<T> | undefined>) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') ref(node);
      else (ref as MutableRefObject<T | null>).current = node;
    });
  };
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** Visual "partially selected" state (e.g. a table's select-all checkbox with some rows checked). Set via the DOM property, not an HTML attribute. */
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, indeterminate = false, id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const internalRef = useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(ref, internalRef);

    useEffect(() => {
      if (internalRef.current) internalRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-center gap-2 font-sans text-[13px] text-primary',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
        )}
      >
        <span className="relative inline-flex h-[17px] w-[17px] shrink-0 items-center justify-center">
          <input
            ref={mergedRef}
            id={checkboxId}
            type="checkbox"
            disabled={disabled}
            className={cn(
              'peer h-[17px] w-[17px] shrink-0 appearance-none rounded-[4px] border border-border-default bg-surface transition-colors',
              'hover:border-border-strong',
              'checked:border-interactive-accent checked:bg-interactive-accent',
              'indeterminate:border-interactive-accent indeterminate:bg-interactive-accent',
              'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
              'disabled:cursor-not-allowed',
              className
            )}
            {...props}
          />
          <Check
            aria-hidden="true"
            size={12}
            strokeWidth={3}
            className="pointer-events-none absolute text-inverse opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
          />
          <Minus
            aria-hidden="true"
            size={12}
            strokeWidth={3}
            className="pointer-events-none absolute text-inverse opacity-0 peer-indeterminate:opacity-100"
          />
        </span>
        {label}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
