import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfidenceBadge } from './ConfidenceBadge';

describe('ConfidenceBadge', () => {
  it('renders the rounded percentage', () => {
    render(<ConfidenceBadge value={97.6} />);
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('labels the icon chip with the confidence for assistive tech', () => {
    render(<ConfidenceBadge value={92} />);
    expect(screen.getByRole('img', { name: '92% confidence' })).toBeInTheDocument();
  });

  it('uses the danger tone below 70% for the icon chip', () => {
    render(<ConfidenceBadge value={54} />);
    expect(screen.getByRole('img', { name: '54% confidence' })).toHaveClass('bg-danger-bg');
  });
});
