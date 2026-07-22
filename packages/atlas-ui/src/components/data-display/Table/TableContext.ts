import { createContext, useContext } from 'react';

export type TableDensity = 'comfortable' | 'dense';

export const TableContext = createContext<{ density: TableDensity }>({ density: 'comfortable' });

export function useTableDensity(): TableDensity {
  return useContext(TableContext).density;
}
