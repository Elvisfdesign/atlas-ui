import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartCard } from '@/components/data-display/ChartCard';
import { DonutChart } from './DonutChart';

const SLICES = [
  { label: 'Invoices', value: 43, color: 'accent' as const },
  { label: 'Contracts', value: 28, color: 'processing' as const },
  { label: 'Receipts', value: 14, color: 'warning' as const },
  { label: 'Purchase Orders', value: 10, color: 'info' as const },
  { label: 'Others', value: 5, color: 'neutral' as const },
];

const meta = {
  title: 'Data Display/Donut Chart',
  component: DonutChart,
  parameters: { layout: 'padded' },
  args: { slices: SLICES, total: '24,853', totalLabel: 'Total' },
  render: (args) => (
    <div style={{ width: 420 }}>
      <ChartCard title="Document Types">
        <DonutChart {...args} />
      </ChartCard>
    </div>
  ),
} satisfies Meta<typeof DonutChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = { args: { slices: [] } };
