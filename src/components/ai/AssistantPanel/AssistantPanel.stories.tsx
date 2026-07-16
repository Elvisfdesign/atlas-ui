import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssistantPanel } from './AssistantPanel';

const meta = {
  title: 'AI/Assistant Panel',
  component: AssistantPanel,
  parameters: { layout: 'padded' },
  args: {
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hi Elvis, how can I help? I can help you review, extract, and analyze this document.',
      },
    ],
    suggestedPrompts: [
      'Summarize this document',
      'Check for anomalies',
      'Compare with previous invoices',
      "What's the payment status?",
    ],
  },
  render: (args) => (
    <div className="h-[600px] w-80">
      <AssistantPanel {...args} />
    </div>
  ),
} satisfies Meta<typeof AssistantPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Conversation: Story = {
  args: {
    suggestedPrompts: undefined,
    messages: [
      { id: '1', role: 'assistant', content: 'Hi Elvis, how can I help?' },
      { id: '2', role: 'user', content: 'Summarize this document' },
      {
        id: '3',
        role: 'assistant',
        content: 'This invoice from Acme Corporation totals $12,450.00, due June 18, 2025.',
      },
    ],
  },
};

export const NoBadge: Story = {
  args: { badge: null },
};
