import type { Meta, StoryObj } from '@storybook/react-vite';
import { AISuggestionCard } from './AISuggestionCard';

const meta = {
  title: 'AI/AI Suggestion Card',
  component: AISuggestionCard,
  parameters: { layout: 'padded' },
  args: {
    description: 'Payment terms detected in document',
    suggestedValue: 'Net 30 days',
    confidence: 97,
  },
  render: (args) => (
    <div className="w-72">
      <AISuggestionCard {...args} />
    </div>
  ),
} satisfies Meta<typeof AISuggestionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LowConfidence: Story = {
  args: {
    description: 'Possible duplicate vendor detected',
    suggestedValue: 'Merge with "Acme Corp"',
    confidence: 62,
  },
};
