import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FileRow } from './FileRow';

describe('FileRow', () => {
  it('renders the file name', () => {
    render(<FileRow fileName="Invoice_2024.pdf" />);
    expect(screen.getByText('Invoice_2024.pdf')).toBeInTheDocument();
  });

  it('renders meta text when provided', () => {
    render(<FileRow fileName="Invoice_2024.pdf" meta="2.4 MB · 4 pages" />);
    expect(screen.getByText('2.4 MB · 4 pages')).toBeInTheDocument();
  });

  it('omits the meta line when not provided', () => {
    render(<FileRow fileName="Invoice_2024.pdf" />);
    expect(screen.queryByText(/MB/)).not.toBeInTheDocument();
  });
});
