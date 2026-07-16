import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Bell } from 'lucide-react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('requires and exposes an accessible name via aria-label', () => {
    render(<IconButton icon={<Bell />} aria-label="Notifications" />);
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('hides the decorative icon from assistive tech', () => {
    render(<IconButton icon={<Bell data-testid="bell" />} aria-label="Notifications" />);
    expect(screen.getByTestId('bell')).toHaveAttribute('aria-hidden', 'true');
  });

  it('fires onClick when activated via keyboard', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<IconButton icon={<Bell />} aria-label="Notifications" onClick={onClick} />);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('respects disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<IconButton icon={<Bell />} aria-label="Notifications" onClick={onClick} disabled />);
    await user.click(screen.getByRole('button', { name: 'Notifications' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
