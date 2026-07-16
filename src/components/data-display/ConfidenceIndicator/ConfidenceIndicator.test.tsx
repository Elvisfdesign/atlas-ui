import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfidenceIndicator } from './ConfidenceIndicator';

describe('ConfidenceIndicator', () => {
  it('shows the rounded percentage as text', () => {
    render(<ConfidenceIndicator value={95.6} />);
    expect(screen.getByText('96%')).toBeInTheDocument();
  });

  it('exposes an accessible progressbar labeled with the percentage', () => {
    render(<ConfidenceIndicator value={82} />);
    expect(screen.getByRole('progressbar', { name: '82% confidence' })).toHaveAttribute(
      'aria-valuenow',
      '82'
    );
  });

  it('never conveys confidence by color alone (percentage text is always present)', () => {
    render(<ConfidenceIndicator value={54} />);
    expect(screen.getByText('54%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
