import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KPICard } from './KPICard';

describe('KPICard', () => {
  it('renders label, value, and trend copy', () => {
    render(
      <KPICard
        label="TOTAL WORKFLOWS"
        value={128}
        trend="positive"
        trendValue="+12.5%"
        subtext="vs last 7 days"
      />
    );
    expect(screen.getByText('TOTAL WORKFLOWS')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last 7 days')).toBeInTheDocument();
  });

  it('colors positive trends with success text and negative with danger text', () => {
    const { rerender } = render(
      <KPICard label="X" value={1} trend="positive" trendValue="+1%" subtext="vs last week" />
    );
    expect(screen.getByText('+1%').className).toContain('text-success-text');

    rerender(
      <KPICard label="X" value={1} trend="negative" trendValue="-1%" subtext="vs last week" />
    );
    expect(screen.getByText('-1%').className).toContain('text-danger-text');
  });

  it('only shows the overflow menu button when showMenu is true', () => {
    const { rerender } = render(
      <KPICard label="TOTAL WORKFLOWS" value={1} trend="positive" trendValue="+1%" subtext="x" />
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    rerender(
      <KPICard
        label="TOTAL WORKFLOWS"
        value={1}
        trend="positive"
        trendValue="+1%"
        subtext="x"
        showMenu
      />
    );
    expect(
      screen.getByRole('button', { name: 'More options for TOTAL WORKFLOWS' })
    ).toBeInTheDocument();
  });

  it('fires onMenuClick when the overflow button is activated', async () => {
    const onMenuClick = vi.fn();
    const user = userEvent.setup();
    render(
      <KPICard
        label="TOTAL WORKFLOWS"
        value={1}
        trend="positive"
        trendValue="+1%"
        subtext="x"
        showMenu
        onMenuClick={onMenuClick}
      />
    );
    await user.click(screen.getByRole('button', { name: 'More options for TOTAL WORKFLOWS' }));
    expect(onMenuClick).toHaveBeenCalledOnce();
  });
});
