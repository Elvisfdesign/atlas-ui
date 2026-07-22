import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'storybook-static', 'coverage'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: [
            'buttonVariants',
            'iconButtonVariants',
            'badgeVariants',
            'avatarVariants',
            'ThemeContext',
            'Tabs',
            'TabPanel',
            'ToastProvider',
            'DropdownMenu',
            'DropdownMenuTrigger',
            'ContextMenu',
            'ContextMenuTrigger',
            'Modal',
            'ModalTrigger',
            'ModalClose',
            'Drawer',
            'DrawerTrigger',
            'DrawerClose',
            'Popover',
            'PopoverTrigger',
            'PopoverAnchor',
            'PopoverClose',
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'jsx-a11y/no-autofocus': 'warn',
    },
  },
  {
    // Storybook config isn't part of the published library and isn't
    // consumed by Fast Refresh the same way component source is.
    files: ['.storybook/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  prettierConfig
);
