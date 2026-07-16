import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Forms/Search Input',
  component: SearchInput,
  args: { placeholder: 'Search anything...' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <SearchInput {...args} />
    </div>
  ),
};

export const WithShortcut: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <SearchInput {...args} shortcut="⌘K" />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <SearchInput {...args} disabled />
    </div>
  ),
};
