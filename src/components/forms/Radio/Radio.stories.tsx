import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  args: { value: 'me', label: 'Assign to me' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Group: Story = {
  render: () => (
    <RadioGroup label="Assignment" defaultValue="me">
      <Radio value="me" label="Assign to me" />
      <Radio value="team" label="Assign to my team" />
      <Radio value="unassigned" label="Leave unassigned" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Assignment" defaultValue="me">
      <Radio value="me" label="Assign to me" />
      <Radio value="team" label="Assign to my team" disabled />
    </RadioGroup>
  ),
};
