import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChartCard } from './ChartCard';
import { ChartLegend } from './ChartLegend';

const meta = {
  title: 'Data Display/Chart Card',
  component: ChartCard,
  parameters: { layout: 'padded' },
  args: {
    title: 'Processing Over Time',
    children: (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-border-default text-[12.5px] text-tertiary">
        Chart content
      </div>
    ),
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ChartCard {...args} />
    </div>
  ),
} satisfies Meta<typeof ChartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLegend: Story = {
  args: {
    action: (
      <ChartLegend
        items={[
          { label: 'Processed', color: 'accent' },
          { label: 'Failed', color: 'danger' },
        ]}
      />
    ),
  },
};

export const WithViewAllLink: Story = {
  args: {
    title: 'Recent Activity',
    action: (
      <button type="button" className="font-sans text-[12.5px] font-medium text-interactive-accent">
        View all
      </button>
    ),
  },
};
