import type { Preview, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';
import '../src/styles/globals.css';
import '../src/docs/docs.css';

// Named with a capital letter (Storybook doesn't care, but it satisfies the
// react-hooks/rules-of-hooks component-name heuristic for the useEffect below).
const AtlasThemeDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme ?? 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div data-theme={theme} className="bg-canvas p-8 text-primary">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    backgrounds: { disable: true },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Elevation', 'Motion', 'Icons'],
          'Actions',
          ['Button', 'Icon Button', 'Inline Action'],
          'Forms',
          ['Input', 'Search Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Switch'],
          'Navigation',
          ['Sidebar', 'Top Navigation', 'Tabs', 'Breadcrumb', 'Pagination', 'Step Navigation'],
          'Data Display',
          [
            'Avatar',
            'Badge',
            'KPI Card',
            'Table',
            'Progress Indicator',
            'Confidence Indicator',
            'File Row',
            'User Row',
            'Workflow Card',
            'Chart Card',
            'Line Chart',
            'Donut Chart',
            'Activity Feed',
            'Detail List',
          ],
          'Feedback',
          [
            'Inline Alert',
            'Banner',
            'Toast',
            'Empty State',
            'Loading State',
            'Skeleton',
            'Status Indicator',
          ],
          'Overlays',
          [
            'Tooltip',
            'Dropdown Menu',
            'Context Menu',
            'Modal',
            'Confirmation Dialog',
            'Drawer',
            'Popover',
            'Command Menu',
            'User Menu',
            'Notification Panel',
          ],
          'AI',
          [
            'AI Label',
            'Confidence Badge',
            'Confidence Meter',
            'Extracted Field Row',
            'AI Suggestion Card',
            'Human Review Banner',
            'Approval Panel',
            'Suggested Prompt',
            'Prompt Input',
            'Assistant Panel',
            'Prompt History Item',
            'AI Assistant State',
          ],
          'Patterns',
          'Templates',
          'Playground',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Atlas theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [AtlasThemeDecorator],
};

export default preview;
