import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarItem } from './SidebarItem';

describe('SidebarItem', () => {
  it('renders as a button by default and fires onClick', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<SidebarItem onClick={onClick}>Home</SidebarItem>);
    const item = screen.getByRole('button', { name: 'Home' });
    await user.click(item);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders as a link when `href` is given', () => {
    render(<SidebarItem href="/review-queue">Review Queue</SidebarItem>);
    expect(screen.getByRole('link', { name: 'Review Queue' })).toHaveAttribute(
      'href',
      '/review-queue'
    );
  });

  it('marks the active item with aria-current="page"', () => {
    render(
      <SidebarItem href="/review-queue" active>
        Review Queue
      </SidebarItem>
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-current', 'page');
  });

  it('renders a count chip when provided', () => {
    render(<SidebarItem count={12}>Review Queue</SidebarItem>);
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('is keyboard operable', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<SidebarItem onClick={onClick}>Home</SidebarItem>);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Home' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });
});
