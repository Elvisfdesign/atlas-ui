import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['text', 'circle', 'rect'] },
  },
  args: { variant: 'rect', width: 240, height: 16 },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rect: Story = {};

export const Text: Story = { args: { variant: 'text', width: 180, height: undefined } };

export const Circle: Story = { args: { variant: 'circle', width: 36, height: 36 } };

export const Composition: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Skeleton variant="circle" width={36} height={36} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton variant="text" width={140} />
        <Skeleton variant="text" width={100} />
      </div>
    </div>
  ),
};
