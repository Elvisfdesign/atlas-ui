import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: {
      control: 'select',
      options: [
        'neutral',
        'info',
        'success',
        'warning',
        'danger',
        'processing',
        'review',
        'draft',
        'ai',
      ],
    },
  },
  args: { tone: 'neutral', children: 'Draft' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="success">Active</Badge>
      <Badge tone="warning">Pending</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="processing">Processing</Badge>
      <Badge tone="review">Review</Badge>
      <Badge tone="draft">Draft</Badge>
      <Badge tone="ai">AI</Badge>
    </div>
  ),
};
