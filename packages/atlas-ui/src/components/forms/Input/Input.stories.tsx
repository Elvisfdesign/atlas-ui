import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { Input } from './Input';

const meta = {
  title: 'Forms/Input',
  component: Input,
  args: {
    label: 'Workspace name',
    placeholder: 'Enter workspace name',
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} />
    </div>
  ),
};

export const Small: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} size="small" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} helperText="Visible to everyone in this workspace." />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} error="Workspace name is required" required />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} disabled defaultValue="Acme Inc." />
    </div>
  ),
};

export const WithLeadingIcon: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Input {...args} label="Email" placeholder="you@company.com" leadingIcon={<Mail size={15} />} />
    </div>
  ),
};
