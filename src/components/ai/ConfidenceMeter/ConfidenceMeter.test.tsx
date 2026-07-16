import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfidenceMeter } from './ConfidenceMeter';

describe('ConfidenceMeter', () => {
  it('renders the label and rounded percentage', () => {
    render(<ConfidenceMeter value={96.4} label="Overall confidence" />);
    expect(screen.getByText('Overall confidence')).toBeInTheDocument();
    expect(screen.getByText('96%')).toBeInTheDocument();
  });

  it('exposes the value on the progress bar', () => {
    render(<ConfidenceMeter value={96} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '96');
  });

  it('uses the danger tone below 70%', () => {
    render(<ConfidenceMeter value={48} />);
    expect(screen.getByText('48%')).toHaveClass('text-danger-text');
  });
});
