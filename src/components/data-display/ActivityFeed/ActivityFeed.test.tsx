import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivityFeed } from './ActivityFeed';

const ITEMS = [
  { id: '1', fileName: 'Invoice_9821.pdf', type: 'Invoice', status: 'Completed', time: '2m ago' },
  { id: '2', fileName: 'Receipt_1298.jpg', type: 'Receipt', status: 'Failed', time: '2h ago' },
];

describe('ActivityFeed', () => {
  it('renders the title and each row', () => {
    render(<ActivityFeed items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Recent Activity' })).toBeInTheDocument();
    expect(screen.getByText('Invoice_9821.pdf')).toBeInTheDocument();
    expect(screen.getByText('Receipt_1298.jpg')).toBeInTheDocument();
  });

  it('renders a status badge with a sensible default tone per row', () => {
    render(<ActivityFeed items={ITEMS} />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('shows the "View all" action and fires onViewAll', async () => {
    const user = userEvent.setup();
    const onViewAll = vi.fn();
    render(<ActivityFeed items={ITEMS} onViewAll={onViewAll} />);
    await user.click(screen.getByRole('button', { name: 'View all' }));
    expect(onViewAll).toHaveBeenCalledOnce();
  });

  it('shows the empty message when there are no items', () => {
    render(<ActivityFeed items={[]} emptyMessage="Nothing to show" />);
    expect(screen.getByText('Nothing to show')).toBeInTheDocument();
  });
});
