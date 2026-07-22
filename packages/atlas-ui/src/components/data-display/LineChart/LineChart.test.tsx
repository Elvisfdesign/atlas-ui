import { describe, expect, it, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';

const DATA = [
  { date: 'May 12', processed: 100, failed: 4 },
  { date: 'May 13', processed: 120, failed: 2 },
];
const SERIES = [
  { key: 'processed', label: 'Processed', color: 'accent' as const },
  { key: 'failed', label: 'Failed', color: 'danger' as const },
];

beforeAll(() => {
  // recharts' ResponsiveContainer uses ResizeObserver, which jsdom doesn't implement.
  if (typeof ResizeObserver === 'undefined') {
    class ResizeObserverStub {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    global.ResizeObserver = ResizeObserverStub;
  }
});

describe('LineChart', () => {
  it('shows a loading placeholder with an accessible status role when loading', () => {
    render(<LineChart data={DATA} xKey="date" series={SERIES} loading />);
    expect(screen.getByRole('status', { name: 'Loading chart' })).toBeInTheDocument();
  });

  it('shows the empty message when data is empty', () => {
    render(<LineChart data={[]} xKey="date" series={SERIES} emptyMessage="Nothing yet" />);
    expect(screen.getByText('Nothing yet')).toBeInTheDocument();
  });

  it('renders without crashing when given data', () => {
    const { container } = render(<LineChart data={DATA} xKey="date" series={SERIES} />);
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
  });

  it('renders a screen-reader-only text summary of the trend', () => {
    render(<LineChart data={DATA} xKey="date" series={SERIES} />);
    expect(screen.getByText(/Processed: 100 to 120/)).toBeInTheDocument();
    expect(screen.getByText(/Failed: 4 to 2/)).toBeInTheDocument();
  });
});
