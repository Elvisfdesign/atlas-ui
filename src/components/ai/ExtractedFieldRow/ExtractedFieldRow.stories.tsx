import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExtractedFieldRow } from './ExtractedFieldRow';

const meta = {
  title: 'AI/Extracted Field Row',
  component: ExtractedFieldRow,
  parameters: { layout: 'padded' },
  args: {
    label: 'Vendor Name',
    value: 'Acme Corporation',
    confidence: 98,
  },
} satisfies Meta<typeof ExtractedFieldRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80 divide-y divide-border-default">
      <ExtractedFieldRow {...args} />
    </div>
  ),
};

export const FieldList: Story = {
  render: () => (
    <div className="w-80 divide-y divide-border-default">
      <ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />
      <ExtractedFieldRow label="Invoice Number" value="INV-9821" confidence={95} />
      <ExtractedFieldRow label="Invoice Date" value="May 18, 2025" confidence={97} />
      <ExtractedFieldRow label="Status" value="Pending" confidence={68} />
    </div>
  ),
};
