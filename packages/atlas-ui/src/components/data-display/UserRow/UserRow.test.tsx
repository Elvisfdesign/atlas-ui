import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserRow } from './UserRow';

describe('UserRow', () => {
  it('renders the name and an avatar with an accessible name matching it', () => {
    render(<UserRow name="Sophia Carter" />);
    expect(screen.getByText('Sophia Carter')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Sophia Carter' })).toBeInTheDocument();
  });

  it('renders meta text when provided', () => {
    render(<UserRow name="Sophia Carter" meta="Assigned 2 hours ago" />);
    expect(screen.getByText('Assigned 2 hours ago')).toBeInTheDocument();
  });

  it('omits the meta line when not provided', () => {
    render(<UserRow name="Sophia Carter" />);
    expect(screen.queryByText(/Assigned/)).not.toBeInTheDocument();
  });
});
