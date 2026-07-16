import type { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast, ToastProvider, ToastViewport } from './Toast';

function renderToast(props: Partial<ComponentProps<typeof Toast>> = {}) {
  const onOpenChange = vi.fn();
  render(
    <ToastProvider>
      <Toast title="Workflow published" description="Invoice Approval is now live." open onOpenChange={onOpenChange} {...props} />
      <ToastViewport />
    </ToastProvider>
  );
  return { onOpenChange };
}

describe('Toast', () => {
  it('renders the title and description', () => {
    renderToast();
    expect(screen.getByText('Workflow published')).toBeInTheDocument();
    expect(screen.getByText('Invoice Approval is now live.')).toBeInTheDocument();
  });

  it('renders without a description', () => {
    renderToast({ description: undefined });
    expect(screen.getByText('Workflow published')).toBeInTheDocument();
  });

  it('fires onOpenChange(false) when the close button is clicked', async () => {
    const user = userEvent.setup();
    const { onOpenChange } = renderToast();
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
