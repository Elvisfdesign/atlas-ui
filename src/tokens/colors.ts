/**
 * Atlas color tokens.
 *
 * Two layers, matching the Atlas Figma Variables model exactly:
 *  - `primitiveColors`  raw values. Never referenced directly by components.
 *  - `semanticColors`   purpose-based aliases to primitives, one value per theme.
 *                       This is the layer components actually bind to.
 *
 * Source: Atlas UI System, 04 — Variables & Tokens (Primitive Colors +
 * Semantic Colors collections, Light + Dark modes).
 */

export const primitiveColors = {
  gray: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f6',
    200: '#efeff1',
    300: '#e7e7e9',
    400: '#d8d8dc',
    500: '#b9b9be',
    600: '#6e6e73',
    700: '#56565b',
    800: '#2a2a2e',
    900: '#0a0a0b',
  },
  indigo: { 50: '#eef2ff', 500: '#4f46e5', 600: '#4338ca', 700: '#3730a3' },
  green: { 50: '#e8f5ea', 500: '#16a34a', 700: '#146b33' },
  amber: { 50: '#fdf3e2', 500: '#d97706', 700: '#b45309' },
  red: { 50: '#fce9e9', 500: '#dc2626', 700: '#b91c1c' },
  blue: { 50: '#eaf1fe', 500: '#2563eb', 700: '#1d4ed8' },
  teal: { 500: '#2da88e' },
  violet: { 50: '#fbfafe', 200: '#e4e1fb' },
} as const;

export type ThemeMode = 'light' | 'dark';

/**
 * Semantic color tokens, one value per theme.
 * Every key here becomes a CSS custom property: `--color-<key>`.
 */
export const semanticColors = {
  'background-canvas': { light: '#fafafa', dark: '#0e0e10' },
  'background-surface': { light: '#ffffff', dark: '#151518' },
  'background-surface-subtle': { light: '#fafafa', dark: '#1c1c20' },
  'background-surface-elevated': { light: '#ffffff', dark: '#222227' },
  'background-inverse': { light: '#0a0a0b', dark: '#f2f2f3' },

  'text-primary': { light: '#0a0a0b', dark: '#f2f2f3' },
  'text-secondary': { light: '#56565b', dark: '#9a9aa1' },
  'text-tertiary': { light: '#6e6e73', dark: '#8a8a92' },
  'text-disabled': { light: '#b9b9be', dark: '#55555c' },
  'text-inverse': { light: '#ffffff', dark: '#16161a' },
  'text-on-avatar': { light: '#ffffff', dark: '#ffffff' },

  'border-subtle': { light: '#efeff1', dark: '#202024' },
  'border-default': { light: '#e7e7e9', dark: '#2a2a30' },
  'border-strong': { light: '#d8d8dc', dark: '#3a3a42' },
  'border-focus': { light: '#4f46e5', dark: '#7c74f5' },
  'border-error': { light: '#dc2626', dark: '#ef4444' },

  'interactive-primary': { light: '#0a0a0b', dark: '#f2f2f3' },
  'interactive-primary-hover': { light: '#2a2a2e', dark: '#e4e4e6' },
  'interactive-primary-pressed': { light: '#56565b', dark: '#d6d6d9' },
  'interactive-accent': { light: '#4f46e5', dark: '#7c74f5' },
  'interactive-accent-hover': { light: '#4338ca', dark: '#9089f7' },
  'interactive-accent-solid': { light: '#4f46e5', dark: '#4f46e5' },
  'interactive-danger': { light: '#dc2626', dark: '#ef4444' },
  'interactive-selected': { light: '#edecfc', dark: '#1f1f2e' },

  'status-success-background': { light: '#e8f5ea', dark: '#14261b' },
  'status-success-text': { light: '#146b33', dark: '#4ade80' },
  'status-warning-background': { light: '#fdf3e2', dark: '#2a2013' },
  'status-warning-text': { light: '#b45309', dark: '#fbbf24' },
  'status-danger-background': { light: '#fce9e9', dark: '#2a1616' },
  'status-danger-text': { light: '#b91c1c', dark: '#f87171' },
  'status-danger-solid': { light: '#dc2626', dark: '#ef4444' },
  'status-info-background': { light: '#eaf1fe', dark: '#16202e' },
  'status-info-text': { light: '#1d4ed8', dark: '#60a5fa' },
  'status-processing-text': { light: '#2da88e', dark: '#2dd4bf' },

  'ai-background': { light: '#fbfafe', dark: '#1a1825' },
  'ai-border': { light: '#e4e1fb', dark: '#322c4a' },
  'ai-accent': { light: '#6d4fe0', dark: '#9b8afb' },
  'ai-text': { light: '#0a0a0b', dark: '#f2f2f3' },

  'disabled-background': { light: '#f5f5f6', dark: '#1c1c20' },
  'disabled-text': { light: '#b9b9be', dark: '#55555c' },
  'focus-ring': { light: '#4f46e5', dark: '#7c74f5' },

  'selection-background': { light: '#edecfc', dark: '#1f1f2e' },
  'selection-border': { light: '#4f46e5', dark: '#7c74f5' },
  'overlay-scrim': { light: '#0a0a0b', dark: '#0a0a0b' },

  'avatar-bg-1': { light: '#e5896e', dark: '#e5896e' },
  'avatar-bg-2': { light: '#4ca37e', dark: '#4ca37e' },
  'avatar-bg-3': { light: '#d8d8dc', dark: '#d8d8dc' },

  // Light value confirmed directly against the live Review Queue table
  // header fill in Atlas Product (#f5f5f6) — corrects a 1-shade drift from
  // the previously transcribed #fafafa. Per "Product wins when Product and
  // the UI System differ."
  'table-header-background': { light: '#f5f5f6', dark: '#1c1c20' },
  'table-header-text': { light: '#56565b', dark: '#9a9aa1' },
  'table-header-divider': { light: '#e7e7e9', dark: '#2a2a30' },
  'table-header-sort-icon': { light: '#6e6e73', dark: '#8a8a92' },
  'table-row-background': { light: '#ffffff', dark: '#151518' },
  'table-row-hover': { light: '#efeff1', dark: '#202024' },
  'table-row-selected': { light: '#edecfc', dark: '#1f1f2e' },
  'table-row-focus': { light: '#4f46e5', dark: '#7c74f5' },
  'table-row-border': { light: '#efeff1', dark: '#202024' },
  'table-bulk-action-background': { light: '#0a0a0b', dark: '#f2f2f3' },
  'table-bulk-action-text': { light: '#ffffff', dark: '#151518' },
} as const satisfies Record<string, Record<ThemeMode, string>>;

export type SemanticColorToken = keyof typeof semanticColors;
