/**
 * Atlas spacing scale — a 4pt rhythm. Every gap and padding value in Atlas
 * maps to this scale. Source: Atlas UI System, 03 — Foundations, Spacing.
 *
 * `56` documents the already-established documentation-page section-gap
 * tier (see Atlas UI System Foundations); it is not used by product
 * components, only by long-form documentation layouts if this library
 * grows a docs site of its own.
 */
export const spacing = {
  0: '0px',
  2: '2px',
  4: '4px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  80: '80px',
  96: '96px',
} as const;

export type SpacingToken = keyof typeof spacing;
