import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, Inbox, Workflow, Database, BarChart3, Sparkles, Plug, Users, Settings } from 'lucide-react';
import { Sidebar, SidebarSection } from './Sidebar';
import { SidebarItem } from './SidebarItem';

const meta = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: 560 }}>
      <Sidebar>
        <SidebarSection>
          <SidebarItem icon={<Home size={16} />}>Home</SidebarItem>
          <SidebarItem icon={<Inbox size={16} />} active count={12}>
            Review Queue
          </SidebarItem>
          <SidebarItem icon={<Workflow size={16} />}>Workflows</SidebarItem>
          <SidebarItem icon={<Database size={16} />}>Data Explorer</SidebarItem>
          <SidebarItem icon={<BarChart3 size={16} />}>Analytics</SidebarItem>
          <SidebarItem icon={<Sparkles size={16} />}>AI Assistant</SidebarItem>
          <SidebarItem icon={<Plug size={16} />}>Integrations</SidebarItem>
        </SidebarSection>
        <SidebarSection withDivider>
          <SidebarItem icon={<Users size={16} />}>Teams</SidebarItem>
          <SidebarItem icon={<Settings size={16} />}>Settings</SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};
