import { createContext, useContext } from 'react';

export interface RadioGroupContextValue {
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroup() {
  return useContext(RadioGroupContext);
}
