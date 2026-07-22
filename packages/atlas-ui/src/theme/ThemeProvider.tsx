import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Atlas supports Light, Dark, and (future) High Contrast. Themes switch by
 * setting `data-theme` on the root element — every component reads color
 * through semantic CSS variables (see src/styles/tokens.css), so no
 * component is ever duplicated per theme.
 */
export type AtlasTheme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** The user's preference: 'light' | 'dark' | 'system'. */
  theme: AtlasTheme;
  /** What's actually applied right now ('system' is resolved to light/dark). */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: AtlasTheme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'atlas-ui-theme';

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readStoredTheme(): AtlasTheme {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    // localStorage unavailable (SSR, privacy mode) — fall through to default.
  }
  return 'system';
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Override the initial theme (skips localStorage read) — mainly for tests/Storybook. */
  defaultTheme?: AtlasTheme;
  /** Element to apply `data-theme` to. Defaults to `document.documentElement`. */
  target?: HTMLElement;
}

export function ThemeProvider({ children, defaultTheme, target }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<AtlasTheme>(() => defaultTheme ?? readStoredTheme());
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setSystemTheme(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const el = target ?? document.documentElement;
    el.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme, target]);

  const setTheme = useCallback((next: AtlasTheme) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
