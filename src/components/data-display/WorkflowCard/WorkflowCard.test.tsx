import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkflowCard } from './WorkflowCard';

describe('WorkflowCard', () => {
  it('renders title, description, and status as a static card by default', () => {
    render(
      <WorkflowCard title="Invoice Approval" description="Routes invoices to finance." status="Active" />
    );
    expect(screen.getByText('Invoice Approval')).toBeInTheDocument();
    expect(screen.getByText('Routes invoices to finance.')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders as a button and fires onClick when provided', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <WorkflowCard title="Invoice Approval" description="Routes invoices." status="Active" onClick={onClick} />
    );
    await user.click(screen.getByRole('button', { name: /Invoice Approval/ }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('shows the metrics row when volume or successRate is present', () => {
    render(
      <WorkflowCard
        title="Invoice Approval"
        description="Routes invoices."
        status="Active"
        volume="1,245"
        successRate="98.2%"
      />
    );
    expect(screen.getByText('1,245')).toBeInTheDocument();
    expect(screen.getByText('98.2%')).toBeInTheDocument();
  });

  it('omits the metrics row when neither volume nor successRate is present', () => {
    render(<WorkflowCard title="Expense Categorization" description="Tags expenses." status="Draft" />);
    expect(screen.queryByText('·')).not.toBeInTheDocument();
  });
});
