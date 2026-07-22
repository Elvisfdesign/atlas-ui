import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

/**
 * Replaces Storybook's default manager chrome (sidebar brand, colors) with
 * Atlas UI's own identity. Values below are the same Atlas tokens used
 * everywhere else in this repo (see src/tokens/colors.ts) — the doc site
 * is themed with Atlas, not a separate design.
 */
const atlasManagerTheme = create({
  base: 'light',

  brandTitle: 'Atlas UI',
  brandUrl: 'https://github.com/atlas-ui',
  brandImage: '/atlas-mark.svg',
  brandTarget: '_self',

  colorPrimary: '#4f46e5', // interactive-accent
  colorSecondary: '#4f46e5',

  appBg: '#fafafa', // background-canvas
  appContentBg: '#ffffff', // background-surface
  appPreviewBg: '#ffffff',
  appBorderColor: '#e7e7e9', // border-default
  appBorderRadius: 8,

  fontBase: '"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif',
  fontCode: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',

  textColor: '#0a0a0b', // text-primary
  textInverseColor: '#ffffff',
  textMutedColor: '#56565b', // text-secondary

  barTextColor: '#56565b',
  barSelectedColor: '#4f46e5',
  barHoverColor: '#4f46e5',
  barBg: '#ffffff',

  buttonBg: '#ffffff',
  buttonBorder: '#e7e7e9',
  booleanBg: '#f5f5f6',
  booleanSelectedBg: '#ffffff',

  inputBg: '#ffffff',
  inputBorder: '#e7e7e9',
  inputTextColor: '#0a0a0b',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme: atlasManagerTheme,
  sidebar: {
    showRoots: false,
  },
});
