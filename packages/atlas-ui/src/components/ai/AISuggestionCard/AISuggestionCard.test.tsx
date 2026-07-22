import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AISuggestionCard } from './AISuggestionCard';

describe('AISuggestionCard', () => {
  it('renders the description, suggested value, and confidence', () => {
    render(
      <AISuggestionCard
        description="Payment terms detected in document"
        suggestedValue="Net 30 days"
        confidence={97}
      />
    );
    expect(screen.getByText('Payment terms detected in document')).toBeInTheDocument();
    expect(screen.getByText('Net 30 days')).toBeInTheDocument();
    expect(screen.getByText('97% confidence')).toBeInTheDocument();
  });

  it('fires onAccept and onReject', async () => {
    const user = userEvent.setup();
    const onAccept = vi.fn();
    const onReject = vi.fn();
    render(
      <AISuggestionCard
        description="Payment terms detected in document"
        suggestedValue="Net 30 days"
        confidence={97}
        onAccept={onAccept}
        onReject={onReject}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Accept' }));
    await user.click(screen.getByRole('button', { name: 'Reject' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
  });
});
