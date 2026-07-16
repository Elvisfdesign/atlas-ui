import type { Meta, StoryObj } from '@storybook/react-vite';
import { AILabel } from './AILabel';

const meta = {
  title: 'AI/AI Label',
  component: AILabel,
  parameters: { layout: 'centered' },
  args: { children: 'BETA' },
} satisfies Meta<typeof AILabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: { tone: 'accent', children: 'AI Generated' },
};
