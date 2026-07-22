import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpCircle, LogOut, Settings, User } from 'lucide-react';
import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/overlays/DropdownMenu';
import { UserMenu } from './UserMenu';

const meta = {
  title: 'Overlays/User Menu',
  component: UserMenu,
  parameters: { layout: 'centered' },
  args: { name: 'Elvis Meraz', meta: 'Admin', children: null },
  render: (args) => (
    <UserMenu {...args}>
      <DropdownMenuItem icon={<User size={14} />}>Profile</DropdownMenuItem>
      <DropdownMenuItem icon={<Settings size={14} />}>Settings</DropdownMenuItem>
      <DropdownMenuItem icon={<HelpCircle size={14} />}>Help & support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<LogOut size={14} />} destructive>
        Log out
      </DropdownMenuItem>
    </UserMenu>
  ),
} satisfies Meta<typeof UserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InverseAvatar: Story = {
  args: { avatarColor: 'inverse' },
};
