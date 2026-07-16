import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopNav } from './TopNav';

describe('TopNav', () => {
  it('renders as a banner landmark containing its children', () => {
    render(
      <TopNav>
        <span>Search</span>
        <button type="button">Notifications</button>
      </TopNav>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();
  });
});
