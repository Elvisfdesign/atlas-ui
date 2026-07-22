import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

function setup() {
  render(
    <Popover>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent>
        <p>Filter controls</p>
      </PopoverContent>
    </Popover>
  );
}

describe('Popover', () => {
  it('is closed until the trigger is activated', () => {
    setup();
    expect(screen.queryByText('Filter controls')).not.toBeInTheDocument();
  });

  it('opens on trigger click and shows its content', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByText('Filter controls')).toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByText('Filter controls')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByText('Filter controls')).not.toBeInTheDocument();
  });
});
