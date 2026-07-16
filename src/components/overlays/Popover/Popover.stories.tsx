import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/actions/Button';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

const meta = {
  title: 'Overlays/Popover',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="small" icon={<Calendar size={15} />}>
          May 12 – May 18, 2025
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="font-sans text-[12.5px] text-secondary">Date range picker content goes here.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const FilterPanel: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="small" icon={<Filter size={15} />}>
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="flex flex-col gap-3">
          <p className="font-sans text-[13px] font-medium text-primary">Filter by status</p>
          <p className="font-sans text-[12.5px] text-secondary">Filter controls go here.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
