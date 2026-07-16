import type { Meta, StoryObj } from '@storybook/react-vite';
import { DetailList } from './DetailList';

const meta = {
  title: 'Data Display/Detail List',
  component: DetailList,
  parameters: { layout: 'centered' },
  args: {
    items: [
      { label: 'Vendor Name', value: 'Acme Corporation' },
      { label: 'Invoice Number', value: 'INV-9821' },
      { label: 'Invoice Date', value: 'May 18, 2025' },
      { label: 'Total Amount', value: '$12,450.00' },
    ],
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <DetailList {...args} />
    </div>
  ),
} satisfies Meta<typeof DetailList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SingleItem: Story = {
  args: { items: [{ label: 'Status', value: 'Active' }] },
};
