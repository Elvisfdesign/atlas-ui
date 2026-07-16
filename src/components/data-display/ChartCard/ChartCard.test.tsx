import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChartCard } from './ChartCard';
import { ChartLegend } from './ChartLegend';

describe('ChartCard', () => {
  it('renders the title as a heading and its children', () => {
    render(
      <ChartCard title="Processing Over Time">
        <p>Chart content</p>
      </ChartCard>
    );
    expect(screen.getByRole('heading', { name: 'Processing Over Time' })).toBeInTheDocument();
    expect(screen.getByText('Chart content')).toBeInTheDocument();
  });

  it('renders the action slot when provided', () => {
    render(
      <ChartCard title="Document Types" action={<span>View all</span>}>
        <p>Chart content</p>
      </ChartCard>
    );
    expect(screen.getByText('View all')).toBeInTheDocument();
  });
});

describe('ChartLegend', () => {
  it('renders a label for each item', () => {
    render(
      <ChartLegend
        items={[
          { label: 'Processed', color: 'accent' },
          { label: 'Failed', color: 'danger' },
        ]}
      />
    );
    expect(screen.getByText('Processed')).toBeInTheDocument();
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});
