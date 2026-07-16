/**
 * Shared chart color palette for Line Chart and Donut Chart.
 *
 * Source: Atlas Product's Analytics screen — the "Processing Over Time"
 * line chart (Processed/Failed) and "Document Types" donut chart
 * (Invoices/Contracts/Receipts/Purchase Orders/Others), inspected directly
 * via Figma variable bindings. Every series color already resolves to an
 * existing semantic token — `border/focus` (interactive-accent),
 * `status/danger/solid` (interactive-danger), `status/processing/text`,
 * `status/warning/text`, `status/info/text`, and `text/tertiary` — so no
 * new chart-specific tokens were needed; this file just centralizes the
 * mapping in one place so Line Chart, Donut Chart, and their stories all
 * reference the same CSS custom properties (which resolve correctly in
 * both Light and Dark automatically, since they're the existing themed
 * variables).
 */
export const CHART_SERIES_COLORS = {
  accent: 'var(--color-interactive-accent)',
  danger: 'var(--color-interactive-danger)',
  processing: 'var(--color-processing-text)',
  warning: 'var(--color-warning-text)',
  info: 'var(--color-info-text)',
  neutral: 'var(--color-tertiary)',
} as const;

export type ChartSeriesColor = keyof typeof CHART_SERIES_COLORS;

/** The 5-color categorical order Document Types uses (accent first, then processing/warning/info/neutral). */
export const CHART_CATEGORICAL_PALETTE: readonly ChartSeriesColor[] = [
  'accent',
  'processing',
  'warning',
  'info',
  'neutral',
];
