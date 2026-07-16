import type { Meta, StoryObj } from '@storybook/react-vite';
import { WorkflowCard } from './WorkflowCard';

const meta = {
  title: 'Data Display/Workflow Card',
  component: WorkflowCard,
  parameters: { layout: 'centered' },
  args: {
    title: 'Invoice Approval',
    description: 'Routes vendor invoices over $5,000 to finance for manual sign-off.',
    status: 'Active',
    volume: '1,245',
    successRate: '98.2%',
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <WorkflowCard {...args} />
    </div>
  ),
} satisfies Meta<typeof WorkflowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {};

export const Draft: Story = {
  args: {
    title: 'Expense Categorization',
    description: 'Automatically tags expense line items by cost center.',
    status: 'Draft',
    volume: undefined,
    successRate: undefined,
  },
};

export const Scheduled: Story = {
  args: {
    title: 'Monthly Reconciliation',
    description: 'Cross-references processed documents against the ERP export.',
    status: 'Scheduled',
    volume: '—',
    successRate: undefined,
  },
};

export const Archived: Story = {
  args: {
    title: 'Legacy Receipt Import',
    description: 'Superseded by the current receipt ingestion workflow.',
    status: 'Archived',
    volume: '4,890',
    successRate: '91.0%',
  },
};

export const Clickable: Story = {
  args: { onClick: () => {} },
};
