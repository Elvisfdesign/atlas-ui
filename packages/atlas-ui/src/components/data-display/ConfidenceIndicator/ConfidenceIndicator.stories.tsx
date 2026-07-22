import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfidenceIndicator } from './ConfidenceIndicator';

const meta = {
  title: 'Data Display/Confidence Indicator',
  component: ConfidenceIndicator,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { value: 96 },
} satisfies Meta<typeof ConfidenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

/** ≥90% — resolves to the success tone. */
export const High: Story = { args: { value: 96 } };

/** 70–89% — resolves to the warning tone. */
export const Medium: Story = { args: { value: 82 } };

/** <70% — resolves to the danger tone. */
export const Low: Story = { args: { value: 54 } };

export const AllThresholds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <ConfidenceIndicator value={96} />
      <ConfidenceIndicator value={82} />
      <ConfidenceIndicator value={54} />
    </div>
  ),
};
