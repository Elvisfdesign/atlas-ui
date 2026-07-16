import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressIndicator } from './ProgressIndicator';

const meta = {
  title: 'Data Display/Progress Indicator',
  component: ProgressIndicator,
  parameters: { layout: 'centered' },
  argTypes: {
    tone: { control: 'select', options: ['accent', 'success', 'warning', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { value: 64, label: 'Upload progress' },
  render: (args) => (
    <div style={{ width: 160 }}>
      <ProgressIndicator {...args} />
    </div>
  ),
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'sm' } };

export const Tones: Story = {
  render: () => (
    <div style={{ width: 160, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ProgressIndicator value={80} tone="accent" label="Accent" />
      <ProgressIndicator value={96} tone="success" label="Success" />
      <ProgressIndicator value={72} tone="warning" label="Warning" />
      <ProgressIndicator value={40} tone="danger" label="Danger" />
    </div>
  ),
};

export const Empty: Story = { args: { value: 0 } };

export const Full: Story = { args: { value: 100, tone: 'success' } };
