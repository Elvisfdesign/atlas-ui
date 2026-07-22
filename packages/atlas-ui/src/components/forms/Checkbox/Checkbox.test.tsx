import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('associates the label and toggles on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Select row" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('toggles via keyboard (Space)', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Select row" />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
    await user.tab();
    expect(checkbox).toHaveFocus();
    await user.keyboard(' ');
    expect(checkbox).toBeChecked();
  });

  it('fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Select row" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Select row' }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('sets the indeterminate DOM property without checking the box', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
    expect(checkbox.checked).toBe(false);
  });

  it('blocks interaction when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox label="Select row" disabled onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox', { name: 'Select row' });
    expect(checkbox).toBeDisabled();
    await user.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
