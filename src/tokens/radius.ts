/** Atlas corner-radius scale. Source: Atlas UI System, 03 — Foundations, Radius. */
export const radius = {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '999px',
} as const;

export type RadiusToken = keyof typeof radius;
