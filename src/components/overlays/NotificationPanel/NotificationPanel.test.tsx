import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotificationPanel } from './NotificationPanel';

const ITEMS = [
  { id: '1', title: 'Workflow published', description: 'Invoice Approval is now live.', time: '2m ago' },
  { id: '2', title: 'Weekly digest ready', time: 'Yesterday' },
];

describe('NotificationPanel', () => {
  it('renders a labeled trigger without an unread dot by default', () => {
    render(<NotificationPanel items={ITEMS} />);
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('labels the trigger as unread when hasUnread is true', () => {
    render(<NotificationPanel items={ITEMS} hasUnread />);
    expect(screen.getByRole('button', { name: 'Notifications (unread)' })).toBeInTheDocument();
  });

  it('shows notification items once opened', async () => {
    const user = userEvent.setup();
    render(<NotificationPanel items={ITEMS} />);
    await user.click(screen.getByRole('button', { name: 'Notifications' }));
    expect(screen.getByText('Workflow published')).toBeInTheDocument();
    expect(screen.getByText('Weekly digest ready')).toBeInTheDocument();
  });

  it('fires onItemClick with the item id', async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    render(<NotificationPanel items={ITEMS} onItemClick={onItemClick} />);
    await user.click(screen.getByRole('button', { name: 'Notifications' }));
    await user.click(screen.getByText('Workflow published'));
    expect(onItemClick).toHaveBeenCalledWith('1');
  });

  it('shows the empty message when there are no items', async () => {
    const user = userEvent.setup();
    render(<NotificationPanel items={[]} emptyMessage="Nothing yet" />);
    await user.click(screen.getByRole('button', { name: 'Notifications' }));
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
  });
});
