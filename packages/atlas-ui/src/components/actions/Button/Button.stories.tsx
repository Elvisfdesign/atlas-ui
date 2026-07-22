import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['small', 'medium'] },
  },
  args: {
    children: 'Approve',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = { args: { variant: 'secondary', children: 'Cancel' } };

export const Ghost: Story = { args: { variant: 'ghost', children: 'Dismiss' } };

export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } };

export const Small: Story = { args: { size: 'small' } };

export const Loading: Story = { args: { loading: true, children: 'Approving…' } };

export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  args: { icon: <Check size={16} />, children: 'Approve & Continue' },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'secondary', 'ghost', 'destructive'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <Button variant={variant} size="medium">
            Approve
          </Button>
          <Button variant={variant} size="small">
            Approve
          </Button>
          <Button variant={variant} size="medium" disabled>
            Approve
          </Button>
          <Button variant={variant} size="medium" loading>
            Approve
          </Button>
        </div>
      ))}
    </div>
  ),
};
