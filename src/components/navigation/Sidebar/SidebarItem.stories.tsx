import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inbox } from 'lucide-react';
import { SidebarItem } from './SidebarItem';

const meta = {
  title: 'Navigation/Sidebar',
  component: SidebarItem,
  args: { icon: <Inbox size={16} />, children: 'Review Queue' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SidebarItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemDefault: Story = {
  render: (args) => (
    <div style={{ width: 208 }}>
      <SidebarItem {...args} />
    </div>
  ),
};

export const ItemActive: Story = {
  render: (args) => (
    <div style={{ width: 208 }}>
      <SidebarItem {...args} active count={12} />
    </div>
  ),
};

export const ItemAsLink: Story = {
  render: (args) => (
    <div style={{ width: 208 }}>
      <SidebarItem icon={args.icon} href="/review-queue">
        {args.children}
      </SidebarItem>
    </div>
  ),
};
