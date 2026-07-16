import { describe, expect, it, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DonutChart } from './DonutChart';

const SLICES = [
  { label: 'Invoices', value: 43, color: 'accent' as const },
  { label: 'Contracts', value: 28, color: 'processing' as const },
  { label: 'Receipts', value: 14, color: 'warning' as const },
  { label: 'Purchase Orders', value: 10, color: 'info' as const },
  { label: 'Others', value: 5, color: 'neutral' as const },
];

beforeAll(() => {
  if (typeof ResizeObserver === 'undefined') {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    global.ResizeObserver = ResizeObserverStub;
  }
});

describe('DonutChart', () => {
  it('renders the total and its label in the center', () => {
    render(<DonutChart slices={SLICES} total="24,853" totalLabel="Total" />);
    expect(screen.getByText('24,853')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders a legend row with a computed percentage for each slice', () => {
    render(<DonutChart slices={SLICES} total="100" />);
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('43%')).toBeInTheDocument();
    expect(screen.getByText('Others')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('shows the empty message when there are no slices', () => {
    render(<DonutChart slices={[]} total="0" emptyMessage="Nothing yet" />);
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
  });
});
