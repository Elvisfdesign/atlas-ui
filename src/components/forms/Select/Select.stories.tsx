import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = (
  <>
    <option value="invoice">Invoice</option>
    <option value="contract">Contract</option>
    <option value="receipt">Receipt</option>
    <option value="purchase-order">Purchase Order</option>
  </>
);

const meta = {
  title: 'Forms/Select',
  component: Select,
  args: { label: 'Document type', children: options },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 260 }}>
      <Select {...args} />
    </div>
  ),
};

export const WithError: Story = {
  render: (args) => (
    <div style={{ width: 260 }}>
      <Select {...args} error="Select a document type" />
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div style={{ width: 260 }}>
      <Select {...args} disabled defaultValue="invoice" />
    </div>
  ),
};
