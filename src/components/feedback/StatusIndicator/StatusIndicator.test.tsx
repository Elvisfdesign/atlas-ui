import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusIndicator } from './StatusIndicator';

describe('StatusIndicator', () => {
  it('renders the visible label', () => {
    render(<StatusIndicator label="Online" tone="success" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders a decorative dot alongside the label, never color alone', () => {
    const { container } = render(<StatusIndicator label="Away" tone="warning" />);
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).toBeInTheDocument();
    expect(screen.getByText('Away')).toBeInTheDocument();
  });
});
