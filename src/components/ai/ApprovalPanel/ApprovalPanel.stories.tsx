import type { Meta, StoryObj } from '@storybook/react-vite';
import { ApprovalPanel } from './ApprovalPanel';

const meta = {
  title: 'AI/Approval Panel',
  component: ApprovalPanel,
  parameters: { layout: 'padded' },
  args: {
    summary: '7 of 7 fields extracted · 96% avg. confidence',
    onReject: () => {},
    onRequestChanges: () => {},
    onApprove: () => {},
  },
} satisfies Meta<typeof ApprovalPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true },
};
