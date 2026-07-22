import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusIndicator } from './StatusIndicator';

const meta = {
  title: 'Feedback/Status Indicator',
  component: StatusIndicator,
  parameters: { layout: 'padded' },
  argTypes: {
    tone: { control: 'select', options: ['success', 'neutral', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { label: 'Online', tone: 'success' },
} satisfies Meta<typeof StatusIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {};

export const Away: Story = { args: { label: 'Away', tone: 'warning' } };

export const Offline: Story = { args: { label: 'Offline', tone: 'neutral' } };

export const Disconnected: Story = { args: { label: 'Disconnected', tone: 'danger' } };

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatusIndicator label="Online" tone="success" />
      <StatusIndicator label="Away" tone="warning" />
      <StatusIndicator label="Offline" tone="neutral" />
      <StatusIndicator label="Disconnected" tone="danger" />
    </div>
  ),
};
