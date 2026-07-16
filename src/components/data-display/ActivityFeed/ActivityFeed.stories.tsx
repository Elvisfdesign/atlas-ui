import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityFeed } from './ActivityFeed';

const ITEMS = [
  { id: '1', fileName: 'Invoice_9821.pdf', type: 'Invoice', status: 'Completed', time: '2m ago' },
  { id: '2', fileName: 'PO_2314.csv', type: 'Purchase Order', status: 'Completed', time: '15m ago' },
  { id: '3', fileName: 'Contract_v3.docx', type: 'Contract', status: 'Review', time: '1h ago' },
  { id: '4', fileName: 'Receipt_1298.jpg', type: 'Receipt', status: 'Failed', time: '2h ago' },
  { id: '5', fileName: 'Invoice_9819.pdf', type: 'Invoice', status: 'Completed', time: '2h ago' },
];

const meta = {
  title: 'Data Display/Activity Feed',
  component: ActivityFeed,
  parameters: { layout: 'padded' },
  args: { items: ITEMS },
  render: (args) => (
    <div style={{ width: 640 }}>
      <ActivityFeed {...args} />
    </div>
  ),
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithViewAll: Story = { args: { onViewAll: () => {} } };

export const Empty: Story = { args: { items: [] } };
