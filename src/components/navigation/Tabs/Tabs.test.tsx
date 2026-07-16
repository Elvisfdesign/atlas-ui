import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, Tab, TabPanel } from './Tabs';

function renderTabs() {
  return render(
    <Tabs defaultValue="all">
      <TabsList>
        <Tab value="all" count={12}>
          All
        </Tab>
        <Tab value="invoices" count={5}>
          Invoices
        </Tab>
      </TabsList>
      <TabPanel value="all">All panel</TabPanel>
      <TabPanel value="invoices">Invoices panel</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders as a tablist with one tab selected', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'All 12' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Invoices 5' })).toHaveAttribute('aria-selected', 'false');
  });

  it('shows only the active panel', () => {
    renderTabs();
    expect(screen.getByText('All panel')).toBeVisible();
    expect(screen.queryByText('Invoices panel')).not.toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Invoices 5' }));
    expect(screen.getByRole('tab', { name: 'Invoices 5' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Invoices panel')).toBeVisible();
  });

  it('moves focus and selection between tabs with arrow keys', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.tab();
    expect(screen.getByRole('tab', { name: 'All 12' })).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Invoices 5' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Invoices 5' })).toHaveAttribute('aria-selected', 'true');
  });
});
