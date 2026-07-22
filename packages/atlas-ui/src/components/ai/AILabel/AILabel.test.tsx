import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AILabel } from './AILabel';

describe('AILabel', () => {
  it('renders its text content', () => {
    render(<AILabel>BETA</AILabel>);
    expect(screen.getByText('BETA')).toBeInTheDocument();
  });

  it('defaults to the neutral tone', () => {
    render(<AILabel>BETA</AILabel>);
    expect(screen.getByText('BETA')).toHaveClass('bg-canvas');
  });

  it('applies the accent tone classes', () => {
    render(<AILabel tone="accent">AI Generated</AILabel>);
    expect(screen.getByText('AI Generated')).toHaveClass('bg-ai-bg');
  });
});
