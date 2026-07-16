import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HumanReviewBanner } from './HumanReviewBanner';

describe('HumanReviewBanner', () => {
  it('renders the message with role="status"', () => {
    render(<HumanReviewBanner message="Needs a human look." />);
    expect(screen.getByRole('status')).toHaveTextContent('Needs a human look.');
  });

  it('omits the action button when none is given', () => {
    render(<HumanReviewBanner message="Needs a human look." />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('fires onAction when the action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(<HumanReviewBanner message="Needs a human look." actionLabel="Review" onAction={onAction} />);
    await user.click(screen.getByRole('button', { name: 'Review' }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
