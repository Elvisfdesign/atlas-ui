import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Feedback/Empty State',
  component: EmptyState,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'success', 'danger'] },
  },
  args: {
    title: 'No documents in the review queue',
    description: "Documents will appear here once they're submitted for processing.",
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithAction: Story = {
  args: {
    title: 'No workflows yet',
    description: 'Create your first workflow to start automating document review.',
    action: <Button size="small">Create workflow</Button>,
  },
};

/** `tone="success"` — the same shape doubles as a Success state. */
export const Success: Story = {
  args: { tone: 'success', title: 'All caught up', description: 'Every document has been reviewed.' },
};

/** `tone="danger"` — the same shape doubles as an Error state. */
export const Error_: Story = {
  name: 'Error',
  args: {
    tone: 'danger',
    title: "Couldn't load the review queue",
    description: 'Something went wrong on our end.',
    action: <Button size="small" variant="secondary">Try again</Button>,
  },
};
