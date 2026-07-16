import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialog } from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
  it('renders the title and description when open', () => {
    render(
      <ConfirmationDialog
        open
        onOpenChange={() => {}}
        title="Delete this workflow?"
        description="This can't be undone."
        onConfirm={() => {}}
      />
    );
    expect(screen.getByRole('dialog', { name: 'Delete this workflow?' })).toBeInTheDocument();
    expect(screen.getByText("This can't be undone.")).toBeInTheDocument();
  });

  it('fires onConfirm when the confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmationDialog
        open
        onOpenChange={() => {}}
        title="Delete this workflow?"
        confirmLabel="Delete"
        onConfirm={onConfirm}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('fires onOpenChange(false) when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <ConfirmationDialog
        open
        onOpenChange={onOpenChange}
        title="Delete this workflow?"
        onConfirm={() => {}}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('disables both buttons and shows the loading label while loading', () => {
    render(
      <ConfirmationDialog
        open
        onOpenChange={() => {}}
        title="Delete this workflow?"
        confirmLabel="Delete"
        onConfirm={() => {}}
        loading
      />
    );
    expect(screen.getByRole('button', { name: 'Please wait…' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
