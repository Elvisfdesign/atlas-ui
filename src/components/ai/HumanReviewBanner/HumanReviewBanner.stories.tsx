import type { Meta, StoryObj } from '@storybook/react-vite';
import { HumanReviewBanner } from './HumanReviewBanner';

const meta = {
  title: 'AI/Human Review Banner',
  component: HumanReviewBanner,
  parameters: { layout: 'padded' },
  args: {
    message: "The AI wasn't confident enough in 2 fields — a human should confirm them before approving.",
  },
} satisfies Meta<typeof HumanReviewBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = {
  args: { actionLabel: 'Review fields', onAction: () => {} },
};
