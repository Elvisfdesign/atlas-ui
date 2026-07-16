/**
 * Atlas border-width scale and semantic border color role names.
 * Source: Atlas UI System, 03 — Foundations, Borders.
 * Color values themselves live in `colors.ts` (border-subtle/default/strong/focus/error).
 */
export const borderWidth = {
  none: '0px',
  default: '1px',
  strong: '1.5px',
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
