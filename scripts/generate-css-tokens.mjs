/**
 * Generates src/styles/tokens.css from the TypeScript token source of truth.
 * Run via `npm run tokens:build`. Keeping this as a generation step (rather
 * than hand-maintaining two copies) is what "avoid hardcoded values" means
 * in practice: there is exactly one place a designer/engineer edits a token.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  semanticColors,
  spacing,
  radius,
  borderWidth,
  elevation,
  duration,
  easing,
  zIndex,
  sizing,
  typeScale,
} from '../src/tokens/index.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function block(vars) {
  return Object.entries(vars)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
}

const lightColors = Object.fromEntries(
  Object.entries(semanticColors).map(([k, v]) => [`color-${k}`, v.light])
);
const darkColors = Object.fromEntries(
  Object.entries(semanticColors).map(([k, v]) => [`color-${k}`, v.dark])
);

const spacingVars = Object.fromEntries(
  Object.entries(spacing).map(([k, v]) => [`spacing-${k}`, v])
);
const radiusVars = Object.fromEntries(Object.entries(radius).map(([k, v]) => [`radius-${k}`, v]));
const borderVars = Object.fromEntries(
  Object.entries(borderWidth).map(([k, v]) => [`border-width-${k}`, v])
);
const elevationVars = Object.fromEntries(
  Object.entries(elevation).map(([k, v]) => [`elevation-${k}`, v])
);
const durationVars = Object.fromEntries(
  Object.entries(duration).map(([k, v]) => [`duration-${k}`, v])
);
const easingVars = Object.fromEntries(Object.entries(easing).map(([k, v]) => [`easing-${k}`, v]));
const zIndexVars = Object.fromEntries(Object.entries(zIndex).map(([k, v]) => [`z-${k}`, v]));
const sizingVars = Object.fromEntries(Object.entries(sizing).map(([k, v]) => [`size-${k}`, v]));
const typeVars = Object.fromEntries(
  Object.entries(typeScale).flatMap(([k, v]) => [
    [`font-size-${k}`, `${v.size}px`],
    [`line-height-${k}`, `${v.lineHeight}px`],
    [`font-weight-${k}`, `${v.fontWeight}`],
    [`letter-spacing-${k}`, `${v.letterSpacing}px`],
  ])
);

const themeAgnostic = {
  ...spacingVars,
  ...radiusVars,
  ...borderVars,
  ...elevationVars,
  ...durationVars,
  ...easingVars,
  ...zIndexVars,
  ...sizingVars,
  ...typeVars,
  'font-family-sans': '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
};

const css = `/* eslint-disable */
/**
 * GENERATED FILE — do not hand edit.
 * Source: src/tokens/*.ts
 * Regenerate with: npm run tokens:build
 */

:root,
[data-theme='light'] {
${block({ ...lightColors, ...themeAgnostic })}
}

[data-theme='dark'] {
${block(darkColors)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']):not([data-theme='dark']) {
${block(darkColors)}
  }
}
`;

writeFileSync(path.join(__dirname, '../src/styles/tokens.css'), css);
console.log(
  'src/styles/tokens.css written (%d light, %d dark vars)',
  Object.keys(lightColors).length,
  Object.keys(darkColors).length
);
