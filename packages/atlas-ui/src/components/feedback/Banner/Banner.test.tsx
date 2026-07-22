import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './Banner';

describe('Banner', () => {
  it('renders its message', () => {
    render(<Banner tone="info">Scheduled maintenance tonight.</Banner>);
    expect(screen.getByText('Scheduled maintenance tonight.')).toBeInTheDocument();
  });

  it('renders the action slot when provided', () => {
    render(
      <Banner tone="warning" action={<button type="button">Upgrade</button>}>
        Trial ending soon.
      </Banner>
    );
    expect(screen.getByRole('button', { name: 'Upgrade' })).toBeInTheDocument();
  });

  it('renders a dismiss control and fires onDismiss', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Banner tone="success" onDismiss={onDismiss}>
        Published.
      </Banner>
    );
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('omits the dismiss control when onDismiss is not provided', () => {
    render(<Banner tone="info">No dismiss here.</Banner>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });
});
