/**
 * Atlas spacing scale — a 4pt rhythm. Every gap and padding value in Atlas
 * maps to this scale. Source: Atlas UI System, 03 — Foundations, Spacing.
 *
 * `28`, `48`, `56`, and `64` are documentation-page rhythm tiers (see
 * src/docs/docs.css) — not used by product components, only by the
 * Storybook docs layout. `64` is the gap between major sections, `48` is
 * the breathing room around a card/preview block, `28` is the gap from a
 * section divider down to its heading, and `56` remains available for
 * anything that needs a step between 48 and 64.
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
  28: '28px',
  32: '32px',
  40: '40px',
  48: '48px',
  56: '56px',
  64: '64px',
  80: '80px',
  96: '96px',
} as const;

export type SpacingToken = keyof typeof spacing;
