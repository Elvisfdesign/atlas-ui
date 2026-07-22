import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell, Search, X } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/Icon Button',
  component: IconButton,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
  args: {
    icon: <Bell />,
    'aria-label': 'Notifications',
    size: 'medium',
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'small' } };

export const Disabled: Story = { args: { disabled: true } };

export const IconSet: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton icon={<Search />} aria-label="Search" />
      <IconButton icon={<Bell />} aria-label="Notifications" />
      <IconButton icon={<X />} aria-label="Close" />
    </div>
  ),
};
