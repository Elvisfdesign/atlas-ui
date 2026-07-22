import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { AIAssistantState } from './AIAssistantState';

const meta = {
  title: 'AI/AI Assistant State',
  component: AIAssistantState,
  parameters: { layout: 'padded' },
  args: { title: 'Thinking…' },
} satisfies Meta<typeof AIAssistantState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Processing: Story = {
  args: { status: 'processing', title: 'Thinking…', description: 'Reading the document and extracting fields.' },
};

export const ErrorState: Story = {
  args: {
    status: 'error',
    title: "Something went wrong",
    description: "We couldn't get a response. Try again in a moment.",
    action: <Button size="small" variant="secondary">Try again</Button>,
  },
};

export const Empty: Story = {
  args: {
    status: 'empty',
    title: 'Ask the assistant anything',
    description: 'Use a suggested prompt below, or type your own question.',
  },
};
