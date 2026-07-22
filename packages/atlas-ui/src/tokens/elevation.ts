/**
 * Atlas elevation (shadow) scale. Source: Atlas UI System, 03 — Foundations,
 * Elevation. `overlay` is the scrim behind modals/drawers — a flat dark
 * wash, not a drop shadow — handled separately via `overlay-scrim` color.
 */
export const elevation = {
  none: 'none',
  low: '0px 1px 3px rgba(0, 0, 0, 0.06)',
  medium: '0px 4px 12px rgba(0, 0, 0, 0.08)',
  high: '0px 12px 32px rgba(0, 0, 0, 0.12)',
} as const;

export type ElevationToken = keyof typeof elevation;
