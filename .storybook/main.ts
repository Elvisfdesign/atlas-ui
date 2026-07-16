import type { StorybookConfig } from '@storybook/react-vite';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../src/docs/**/*.mdx',
    '../src/components/**/*.mdx',
    '../src/components/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@': path.resolve(dirname, '../src'),
    };
    return viteConfig;
  },
  docs: {
    defaultName: 'Docs',
  },
};

export default config;
