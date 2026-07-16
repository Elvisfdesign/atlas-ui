import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenuItem } from '@/components/overlays/DropdownMenu';
import { UserMenu } from './UserMenu';

function setup() {
  render(
    <UserMenu name="Elvis Meraz" meta="Admin">
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Log out</DropdownMenuItem>
    </UserMenu>
  );
}

describe('UserMenu', () => {
  it('renders an accessible trigger labeled with the person\'s name', () => {
    setup();
    expect(screen.getByRole('button', { name: 'Account menu for Elvis Meraz' })).toBeInTheDocument();
  });

  it('shows the name, meta, and menu items once opened', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Account menu for Elvis Meraz' }));
    expect(screen.getByText('Elvis Meraz')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();
  });
});
