import type { Meta, StoryObj } from '@storybook/react-vite';
import { KPICard } from './KPICard';

const meta = {
  title: 'Data Display/KPI Card',
  component: KPICard,
  parameters: { layout: 'centered' },
  argTypes: {
    trend: { control: 'select', options: ['positive', 'negative'] },
  },
  args: {
    label: 'TOTAL WORKFLOWS',
    value: 128,
    trend: 'positive',
    trendValue: '+12.5%',
    subtext: 'vs last 7 days',
  },
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};

export const Negative: Story = {
  args: { value: 342, trend: 'negative', trendValue: '-4.3%' },
};

export const WithMenu: Story = { args: { showMenu: true } };

export const Row: Story = {
  render: () => (
    <div className="flex gap-4">
      <KPICard
        label="TOTAL WORKFLOWS"
        value={128}
        trend="positive"
        trendValue="+12.5%"
        subtext="vs last 7 days"
      />
      <KPICard
        label="DOCUMENTS PROCESSED"
        value={342}
        trend="negative"
        trendValue="-4.3%"
        subtext="vs last 7 days"
      />
      <KPICard
        label="AVG ACCURACY"
        value="98.7%"
        trend="positive"
        trendValue="+0.4%"
        subtext="vs last 7 days"
      />
    </div>
  ),
};
