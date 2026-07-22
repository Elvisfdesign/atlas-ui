import type { Meta, StoryObj } from '@storybook/react-vite';
import { SuggestedPrompt } from './SuggestedPrompt';

const meta = {
  title: 'AI/Suggested Prompt',
  component: SuggestedPrompt,
  parameters: { layout: 'padded' },
  args: { children: 'Summarize this document' },
} satisfies Meta<typeof SuggestedPrompt>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <SuggestedPrompt {...args} />
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <SuggestedPrompt>Summarize this document</SuggestedPrompt>
      <SuggestedPrompt>Check for anomalies</SuggestedPrompt>
      <SuggestedPrompt>Compare with previous invoices</SuggestedPrompt>
      <SuggestedPrompt>What&rsquo;s the payment status?</SuggestedPrompt>
    </div>
  ),
};
