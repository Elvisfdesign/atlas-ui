/** Atlas motion tokens. Source: Atlas UI System, 03 — Foundations, Motion. */
export const duration = {
  instant: '80ms',
  fast: '120ms',
  normal: '200ms',
  slow: '320ms',
} as const;

export const easing = {
  linear: 'linear',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** Ready-to-use `transition` shorthand pairings matching the Foundations usage notes. */
export const motion = {
  instant: `${duration.instant} ${easing.linear}`, // hover, focus ring
  fast: `${duration.fast} ${easing.easeOut}`, // press, toggle
  normal: `${duration.normal} ${easing.easeInOut}`, // menu, drawer, modal
  slow: `${duration.slow} ${easing.easeInOut}`, // AI generation, loading
} as const;

export type DurationToken = keyof typeof duration;
