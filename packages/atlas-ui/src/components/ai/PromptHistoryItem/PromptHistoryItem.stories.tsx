import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromptHistoryItem } from './PromptHistoryItem';

const meta = {
  title: 'AI/Prompt History Item',
  component: PromptHistoryItem,
  parameters: { layout: 'padded' },
  args: {
    prompt: 'Summarize this document',
    response: 'This invoice from Acme Corporation totals $12,450.00, due June 18, 2025.',
    time: '2m ago',
  },
} satisfies Meta<typeof PromptHistoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 divide-y divide-border-default">
      <PromptHistoryItem {...args} />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="w-80 divide-y divide-border-default">
      <PromptHistoryItem
        prompt="Summarize this document"
        response="This invoice from Acme Corporation totals $12,450.00, due June 18, 2025."
        time="2m ago"
      />
      <PromptHistoryItem prompt="Check for anomalies" response="No anomalies detected." time="1h ago" />
      <PromptHistoryItem prompt="What's the payment status?" time="3h ago" />
    </div>
  ),
};
