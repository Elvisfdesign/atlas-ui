import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders the title and description', () => {
    render(<EmptyState title="No documents" description="Nothing here yet." />);
    expect(screen.getByText('No documents')).toBeInTheDocument();
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  it('renders the action slot when provided', () => {
    render(<EmptyState title="No workflows" action={<button type="button">Create workflow</button>} />);
    expect(screen.getByRole('button', { name: 'Create workflow' })).toBeInTheDocument();
  });

  it('renders without a description', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('supports success and danger tones for the same shape', () => {
    const { rerender } = render(<EmptyState tone="success" title="All caught up" />);
    expect(screen.getByText('All caught up')).toBeInTheDocument();
    rerender(<EmptyState tone="danger" title="Something failed" />);
    expect(screen.getByText('Something failed')).toBeInTheDocument();
  });
});
