import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfidenceBadge } from './ConfidenceBadge';

const meta = {
  title: 'AI/Confidence Badge',
  component: ConfidenceBadge,
  parameters: { layout: 'centered' },
  args: { value: 98 },
} satisfies Meta<typeof ConfidenceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = {
  args: { value: 82 },
};

export const Danger: Story = {
  args: { value: 54 },
};
