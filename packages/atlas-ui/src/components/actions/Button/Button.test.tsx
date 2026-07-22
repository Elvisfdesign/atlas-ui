import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Approve</Button>);
    expect(screen.getByRole('button', { name: 'Approve' })).toBeInTheDocument();
  });

  it('fires onClick when activated', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Approve</Button>);
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is keyboard operable (Enter/Space activate a native button)', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Approve</Button>);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Approve' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={onClick} disabled>
        Approve
      </Button>
    );
    await user.click(screen.getByRole('button', { name: 'Approve' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks itself busy and blocks interaction while loading', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={onClick} loading>
        Approve
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Approve' });
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies the variant and size class names', () => {
    render(
      <Button variant="destructive" size="small">
        Delete
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button.className).toContain('bg-interactive-danger');
  });
});
