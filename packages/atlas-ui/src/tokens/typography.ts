/**
 * Atlas type scale. Source: Atlas UI System, 03 — Foundations, Typography.
 * `size`/`lineHeight` are in px to match the Figma spec 1:1; `letterSpacing`
 * is in px, `0` where the spec does not call one out.
 */
export const fontFamily = {
  sans: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
} as const;

export const typeScale = {
  display: { fontFamily: 'Inter', fontWeight: 700, size: 40, lineHeight: 46, letterSpacing: 0 },
  pageTitle: { fontFamily: 'Inter', fontWeight: 600, size: 26, lineHeight: 32, letterSpacing: 0 },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: 600,
    size: 14.5,
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyLarge: { fontFamily: 'Inter', fontWeight: 400, size: 16, lineHeight: 24, letterSpacing: 0 },
  body: { fontFamily: 'Inter', fontWeight: 400, size: 14, lineHeight: 20, letterSpacing: 0 },
  bodySmall: { fontFamily: 'Inter', fontWeight: 400, size: 12.5, lineHeight: 18, letterSpacing: 0 },
  label: { fontFamily: 'Inter', fontWeight: 500, size: 11, lineHeight: 16, letterSpacing: 1 },
  caption: { fontFamily: 'Inter', fontWeight: 400, size: 10.5, lineHeight: 15, letterSpacing: 0 },
  buttonLabel: { fontFamily: 'Inter', fontWeight: 500, size: 13, lineHeight: 18, letterSpacing: 0 },
  tableHeader: {
    fontFamily: 'Inter',
    fontWeight: 500,
    size: 10.5,
    lineHeight: 15,
    letterSpacing: 0.3,
  },
  numericMetric: {
    fontFamily: 'Inter',
    fontWeight: 600,
    size: 28,
    lineHeight: 34,
    letterSpacing: 0,
  },
} as const;

export type TypeScaleToken = keyof typeof typeScale;
