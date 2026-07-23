/**
 * Atlas spacing scale — a 4pt rhythm. Every gap and padding value in Atlas
 * maps to this scale. Source: Atlas UI System, 03 — Foundations, Spacing.
 *
 * `48` and `56` are documentation-page rhythm tiers, consumed by the
 * DocsLayout/DocsSection component system (see
 * src/docs/components/DocsLayout.tsx and src/docs/docs.css) rather than by
 * product components: `56` is the fixed gap DocsSection's divider carries
 * before every "## Section" (the single "section rhythm" constant, chosen
 * so it always wins under margin-collapsing regardless of what a section
 * ends on), and `48` is the breathing room below a card/table block. `28`
 * and `64` are not currently used by the docs layout — kept in the scale
 * as steps between 24/32 and 56/80 for future use, not because a specific
 * role has been assigned to them.
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
