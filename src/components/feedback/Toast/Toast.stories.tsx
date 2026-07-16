import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, ToastProvider, ToastViewport } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
  args: { title: 'Workflow published', description: 'Invoice Approval is now live.', tone: 'success' },
  render: (args) => (
    <ToastProvider>
      <div style={{ position: 'relative', height: 120, width: 380 }}>
        <Toast {...args} />
      </div>
      <ToastViewport className="static mt-3 max-w-none" />
    </ToastProvider>
  ),
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Info: Story = {
  args: { tone: 'info', title: 'New comment', description: 'Sophia Carter left a note on this document.' },
};

export const Warning: Story = {
  args: { tone: 'warning', title: 'Low confidence', description: '3 fields may need manual review.' },
};

export const Danger: Story = {
  args: { tone: 'danger', title: 'Processing failed', description: 'Receipt_1298.jpg could not be read.' },
};

export const WithoutDescription: Story = {
  args: { description: undefined, title: 'Saved' },
};
