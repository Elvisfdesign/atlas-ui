import type { Meta, StoryObj } from '@storybook/react-vite';
import { PromptInput } from './PromptInput';

const meta = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  parameters: { layout: 'padded' },
  args: {},
  render: (args) => (
    <div className="w-80">
      <PromptInput {...args} />
    </div>
  ),
} satisfies Meta<typeof PromptInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
