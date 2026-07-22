import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InlineAlert } from './InlineAlert';

describe('InlineAlert', () => {
  it('renders the title and description', () => {
    render(
      <InlineAlert title="Heads up" tone="info">
        Something to know.
      </InlineAlert>
    );
    expect(screen.getByText('Heads up')).toBeInTheDocument();
    expect(screen.getByText('Something to know.')).toBeInTheDocument();
  });

  it('uses role="alert" for warning and danger tones', () => {
    render(<InlineAlert tone="danger">Failed.</InlineAlert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info and success tones', () => {
    render(<InlineAlert tone="success">Saved.</InlineAlert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders without a title', () => {
    render(<InlineAlert tone="info">No title here.</InlineAlert>);
    expect(screen.getByText('No title here.')).toBeInTheDocument();
  });
});
