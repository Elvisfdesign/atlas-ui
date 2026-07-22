import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    label: 'Notes',
    placeholder: 'Add any context for the reviewer...',
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Textarea {...args} error="Notes must be under 500 characters" />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Textarea {...args} disabled defaultValue="Reviewed and approved by finance." />
    </div>
  ),
};
