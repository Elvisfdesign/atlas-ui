/**
 * Shared confidence → tone mapping used across Atlas's confidence
 * visualizations (Data Display's Confidence Indicator, and AI's Confidence
 * Badge / Confidence Meter). Same thresholds everywhere so a "92%" reads as
 * the same tone no matter which component renders it.
 */
export type ConfidenceTone = 'success' | 'warning' | 'danger';

export function confidenceTone(value: number): ConfidenceTone {
  if (value >= 90) return 'success';
  if (value >= 70) return 'warning';
  return 'danger';
}
