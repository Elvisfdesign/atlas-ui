import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { IconButton } from '@/components/actions/IconButton';
import { Button } from '@/components/actions/Button';

const meta = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
  args: {
    content: '98% confidence · verified',
    side: 'top',
    children: <button type="button">Hover me</button>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <IconButton icon={<Info />} aria-label="Confidence details" />
    </Tooltip>
  ),
};

export const OnButton: Story = {
  args: { content: 'Approve and move to next document' },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Approve</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-8 p-16">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`Side: ${side}`} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
