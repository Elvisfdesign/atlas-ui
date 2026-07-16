import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
} from './CommandMenu';

function setup(onSelect = vi.fn()) {
  render(
    <CommandMenu open label="Search commands">
      <CommandMenuInput placeholder="Search anything..." />
      <CommandMenuList>
        <CommandMenuEmpty>No results found.</CommandMenuEmpty>
        <CommandMenuItem onSelect={onSelect} value="dashboard">
          Go to Dashboard
        </CommandMenuItem>
        <CommandMenuItem value="workflows">Go to Workflows</CommandMenuItem>
      </CommandMenuList>
    </CommandMenu>
  );
  return { onSelect };
}

describe('CommandMenu', () => {
  it('renders the input and all items when open', () => {
    setup();
    expect(screen.getByPlaceholderText('Search anything...')).toBeInTheDocument();
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Go to Workflows')).toBeInTheDocument();
  });

  it('filters items as the user types', async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText('Search anything...'), 'Dashboard');
    expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    expect(screen.queryByText('Go to Workflows')).not.toBeInTheDocument();
  });

  it('shows the empty message when nothing matches', async () => {
    const user = userEvent.setup();
    setup();
    await user.type(screen.getByPlaceholderText('Search anything...'), 'zzz-no-match');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('fires onSelect when an item is chosen', async () => {
    const user = userEvent.setup();
    const { onSelect } = setup();
    await user.click(screen.getByText('Go to Dashboard'));
    expect(onSelect).toHaveBeenCalledOnce();
  });
});
