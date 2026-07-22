import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotificationPanel } from './NotificationPanel';

const ITEMS = [
  {
    id: '1',
    title: 'Workflow published',
    description: 'Invoice Approval is now live.',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    title: 'Document needs review',
    description: 'Receipt_1298.jpg has low confidence extractions.',
    time: '1h ago',
    read: false,
  },
  { id: '3', title: 'Weekly digest ready', time: 'Yesterday', read: true },
];

const meta = {
  title: 'Overlays/Notification Panel',
  component: NotificationPanel,
  parameters: { layout: 'centered' },
  args: { items: ITEMS },
} satisfies Meta<typeof NotificationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unread: Story = { args: { hasUnread: true } };

export const Empty: Story = { args: { items: [] } };
