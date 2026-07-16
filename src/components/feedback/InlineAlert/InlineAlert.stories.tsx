import type { Meta, StoryObj } from '@storybook/react-vite';
import { InlineAlert } from './InlineAlert';

const meta = {
  title: 'Feedback/Inline Alert',
  component: InlineAlert,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
  args: {
    tone: 'info',
    title: 'Heads up',
    children: 'This workflow will re-process all pending documents once saved.',
  },
  render: (args) => (
    <div style={{ width: 420 }}>
      <InlineAlert {...args} />
    </div>
  ),
} satisfies Meta<typeof InlineAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { tone: 'success', title: 'Saved', children: 'Your changes have been saved.' },
};

export const Warning: Story = {
  args: {
    tone: 'warning',
    title: 'Review recommended',
    children: 'Confidence on 3 fields is below the usual threshold.',
  },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Something went wrong', children: 'The document failed to process.' },
};

export const WithoutTitle: Story = {
  args: { title: undefined, children: 'Search results are limited to the last 30 days.' },
};
