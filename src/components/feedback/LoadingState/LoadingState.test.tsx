import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('renders an accessible status role, with the label visible inside it', () => {
    render(<LoadingState />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveTextContent('Loading…');
  });

  it('renders a custom label', () => {
    render(<LoadingState label="Processing document…" />);
    expect(screen.getByText('Processing document…')).toBeInTheDocument();
  });
});
