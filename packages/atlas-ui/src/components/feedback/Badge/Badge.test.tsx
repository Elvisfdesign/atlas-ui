import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its label as text (status is never color-only)', () => {
    render(<Badge tone="success">Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies the tone class names', () => {
    render(<Badge tone="danger">Failed</Badge>);
    expect(screen.getByText('Failed').className).toContain('bg-danger-bg');
  });

  it('defaults to the neutral tone', () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText('Draft').className).toContain('bg-border-subtle');
  });
});
