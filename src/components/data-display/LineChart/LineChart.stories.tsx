import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartCard, ChartLegend } from '@/components/data-display/ChartCard';
import { LineChart } from './LineChart';

const DATA = [
  { date: 'May 12', processed: 21500, failed: 900 },
  { date: 'May 13', processed: 24200, failed: 1100 },
  { date: 'May 14', processed: 19800, failed: 1600 },
  { date: 'May 15', processed: 27800, failed: 700 },
  { date: 'May 16', processed: 30200, failed: 1200 },
  { date: 'May 17', processed: 28500, failed: 950 },
  { date: 'May 18', processed: 24853, failed: 342 },
];

const SERIES = [
  { key: 'processed', label: 'Processed', color: 'accent' as const },
  { key: 'failed', label: 'Failed', color: 'danger' as const },
];

const meta = {
  title: 'Data Display/Line Chart',
  component: LineChart,
  parameters: { layout: 'padded' },
  args: { data: DATA, xKey: 'date', series: SERIES },
  render: (args) => (
    <div style={{ width: 560 }}>
      <ChartCard
        title="Processing Over Time"
        action={<ChartLegend items={[{ label: 'Processed', color: 'accent' }, { label: 'Failed', color: 'danger' }]} />}
      >
        <LineChart {...args} />
      </ChartCard>
    </div>
  ),
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = { args: { loading: true } };

export const Empty: Story = { args: { data: [] } };
