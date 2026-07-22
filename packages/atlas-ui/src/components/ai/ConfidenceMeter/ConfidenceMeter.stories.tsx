import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfidenceMeter } from './ConfidenceMeter';

const meta = {
  title: 'AI/Confidence Meter',
  component: ConfidenceMeter,
  parameters: { layout: 'padded' },
  args: { value: 96 },
} satisfies Meta<typeof ConfidenceMeter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <ConfidenceMeter {...args} />
    </div>
  ),
};

export const Warning: Story = {
  args: { value: 78 },
  render: (args) => (
    <div className="w-80">
      <ConfidenceMeter {...args} />
    </div>
  ),
};

export const Danger: Story = {
  args: { value: 48, label: 'Extraction confidence' },
  render: (args) => (
    <div className="w-80">
      <ConfidenceMeter {...args} />
    </div>
  ),
};
