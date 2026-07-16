import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal, ModalContent, ModalDescription, ModalTitle, ModalTrigger } from './Modal';

function setup(props: Partial<{ onOpenChange: (open: boolean) => void }> = {}) {
  render(
    <Modal onOpenChange={props.onOpenChange}>
      <ModalTrigger>Open modal</ModalTrigger>
      <ModalContent>
        <ModalTitle>Rename workflow</ModalTitle>
        <ModalDescription>Choose a new name.</ModalDescription>
      </ModalContent>
    </Modal>
  );
}

describe('Modal', () => {
  it('is closed until the trigger is activated', () => {
    setup();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click and shows the title/description', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    expect(screen.getByRole('dialog', { name: 'Rename workflow' })).toBeInTheDocument();
    expect(screen.getByText('Choose a new name.')).toBeInTheDocument();
  });

  it('closes on Escape and fires onOpenChange(false)', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    setup({ onOpenChange });
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders a labeled close button', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Open modal' }));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
