import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { ConfirmationDialog } from './ConfirmationDialog';

const meta = {
  title: 'Overlays/Confirmation Dialog',
  component: ConfirmationDialog,
  parameters: { layout: 'centered' },
  args: {
    open: true,
    onOpenChange: () => {},
    title: 'Delete this workflow?',
    description: 'This can’t be undone. All run history will be lost.',
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmationDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Destructive: Story = {
  args: { destructive: true, confirmLabel: 'Delete workflow' },
};

export const NonDestructive: Story = {
  args: {
    title: 'Publish this workflow?',
    description: 'It will start processing new documents immediately.',
    confirmLabel: 'Publish',
  },
};

export const Loading: Story = {
  args: { destructive: true, confirmLabel: 'Delete workflow', loading: true },
};

export const Interactive: Story = {
  render: () => {
    function Demo() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            Delete workflow
          </Button>
          <ConfirmationDialog
            open={open}
            onOpenChange={setOpen}
            title="Delete this workflow?"
            description="This can’t be undone. All run history will be lost."
            destructive
            confirmLabel="Delete workflow"
            onConfirm={() => setOpen(false)}
          />
        </>
      );
    }
    return <Demo />;
  },
};
