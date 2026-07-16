import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExtractedFieldRow } from './ExtractedFieldRow';

describe('ExtractedFieldRow', () => {
  it('renders the label and value', () => {
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />);
    expect(screen.getByText('Vendor Name')).toBeInTheDocument();
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
  });

  it('renders a Confidence Badge for the value', () => {
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />);
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '98% confidence' })).toBeInTheDocument();
  });
});
