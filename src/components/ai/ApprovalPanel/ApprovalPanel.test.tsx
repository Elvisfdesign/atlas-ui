import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApprovalPanel } from './ApprovalPanel';

describe('ApprovalPanel', () => {
  it('renders the summary text', () => {
    render(<ApprovalPanel summary="7 of 7 fields extracted · 96% avg. confidence" onApprove={() => {}} />);
    expect(screen.getByText('7 of 7 fields extracted · 96% avg. confidence')).toBeInTheDocument();
  });

  it('fires onApprove when the primary action is clicked', async () => {
    const user = userEvent.setup();
    const onApprove = vi.fn();
    render(<ApprovalPanel summary="Summary" onApprove={onApprove} />);
    await user.click(screen.getByRole('button', { name: 'Approve & Continue' }));
    expect(onApprove).toHaveBeenCalledTimes(1);
  });

  it('omits Reject/Request Changes when no handler is given', () => {
    render(<ApprovalPanel summary="Summary" onApprove={() => {}} />);
    expect(screen.queryByRole('button', { name: 'Reject' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Request Changes' })).not.toBeInTheDocument();
  });

  it('disables all actions while loading', () => {
    render(
      <ApprovalPanel
        summary="Summary"
        onReject={() => {}}
        onRequestChanges={() => {}}
        onApprove={() => {}}
        loading
      />
    );
    expect(screen.getByRole('button', { name: 'Reject' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Request Changes' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Approve & Continue' })).toBeDisabled();
  });
});
