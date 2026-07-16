import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserRow } from './UserRow';

const meta = {
  title: 'Data Display/User Row',
  component: UserRow,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
  args: { name: 'Sophia Carter' },
} satisfies Meta<typeof UserRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMeta: Story = { args: { meta: 'Assigned 2 hours ago' } };

export const Medium: Story = { args: { size: 'medium', meta: 'Reviewer' } };

export const List: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 220 }}>
      <UserRow name="Sophia Carter" meta="Assigned 2 hours ago" />
      <UserRow name="James Okafor" meta="Assigned yesterday" />
      <UserRow name="Rin Tanaka" meta="Unassigned" />
    </div>
  ),
};
