import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
    color: { control: 'select', options: [1, 2, 3, 'inverse'] },
  },
  args: { name: 'Elvis Fernandes', size: 'medium' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: 'small' } };

/** The monochrome treatment Atlas uses for the current signed-in user in the app topbar. */
export const CurrentUser: Story = { args: { color: 'inverse', name: 'Elvis Manning' } };

export const AssigneeList: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar size="small" name="Sophia Carter" />
      <Avatar size="small" name="James Okafor" />
      <Avatar size="small" name="Rin Tanaka" />
    </div>
  ),
};

export const PhotoWithFallback: Story = {
  args: { name: 'Sophia Carter', src: 'https://broken-url.example/does-not-exist.jpg' },
};
