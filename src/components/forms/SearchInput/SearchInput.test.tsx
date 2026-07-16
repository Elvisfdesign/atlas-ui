import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders as a searchbox with the default placeholder', () => {
    render(<SearchInput />);
    expect(screen.getByRole('searchbox')).toHaveAttribute('placeholder', 'Search anything...');
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<SearchInput />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'invoice');
    expect(input).toHaveValue('invoice');
  });

  it('renders the shortcut chip as decorative (not part of the accessible name)', () => {
    render(<SearchInput shortcut="⌘K" />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAccessibleName('');
    expect(screen.getByText('⌘K')).toHaveAttribute('aria-hidden', 'true');
  });
});
