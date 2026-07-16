import type { Meta, StoryObj } from '@storybook/react-vite';
import { Bell } from 'lucide-react';
import { TopNav } from './TopNav';
import { SearchInput } from '@/components/forms/SearchInput';
import { IconButton } from '@/components/actions/IconButton';
import { Avatar } from '@/components/data-display/Avatar';

const meta = {
  title: 'Navigation/Top Navigation',
  component: TopNav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TopNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TopNav>
      <SearchInput aria-label="Search" shortcut="⌘K" className="w-80" />
      <div className="flex items-center gap-3">
        <IconButton icon={<Bell />} aria-label="Notifications" />
        <Avatar name="Elvis Meraz" color="inverse" />
      </div>
    </TopNav>
  ),
};
