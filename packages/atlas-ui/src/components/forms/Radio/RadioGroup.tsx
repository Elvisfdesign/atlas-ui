import { useId, useState, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { RadioGroupContext } from './RadioGroupContext';

/**
 * Groups a set of `Radio` controls under one shared `name`, so callers
 * don't have to repeat it on every option. Manages selection as a
 * controlled (`value`/`onValueChange`) or uncontrolled (`defaultValue`)
 * group, matching how a native radio group behaves as one unit.
 */
export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
}

export function RadioGroup({
  className,
  name,
  value,
  defaultValue,
  onValueChange,
  label,
  children,
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const resolvedName = name ?? generatedName;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const resolvedValue = value ?? uncontrolledValue;

  return (
    <RadioGroupContext.Provider
      value={{
        name: resolvedName,
        value: resolvedValue,
        onValueChange: (next) => {
          setUncontrolledValue(next);
          onValueChange?.(next);
        },
      }}
    >
      <div
        role="radiogroup"
        aria-label={label}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
