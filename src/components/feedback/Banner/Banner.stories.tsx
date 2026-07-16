import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { Banner } from './Banner';

const meta = {
  title: 'Feedback/Banner',
  component: Banner,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
  args: { tone: 'info', children: 'Scheduled maintenance begins at 10:00 PM UTC tonight.' },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const WithAction: Story = {
  args: {
    tone: 'warning',
    children: 'Your trial ends in 3 days.',
    action: (
      <Button size="small" variant="secondary">
        Upgrade
      </Button>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    tone: 'success',
    children: 'Workflow published successfully.',
    onDismiss: () => {},
  },
};

export const Danger: Story = {
  args: { tone: 'danger', children: 'Payment failed — update your billing details to avoid service interruption.' },
};
