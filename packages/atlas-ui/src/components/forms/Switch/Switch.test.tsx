import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders with the switch role and toggles on click', async () => {
    const user = userEvent.setup();
    render(<Switch label="Auto-approve" />);
    const toggle = screen.getByRole('switch', { name: 'Auto-approve' });
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('toggles via keyboard (Space)', async () => {
    const user = userEvent.setup();
    render(<Switch label="Auto-approve" />);
    const toggle = screen.getByRole('switch', { name: 'Auto-approve' });
    await user.tab();
    expect(toggle).toHaveFocus();
    await user.keyboard(' ');
    expect(toggle).toBeChecked();
  });

  it('fires onChange', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Auto-approve" onChange={onChange} />);
    await user.click(screen.getByRole('switch', { name: 'Auto-approve' }));
    expect(onChange).toHaveBeenCalledOnce();
  });

  it('blocks interaction when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Switch label="Auto-approve" disabled onChange={onChange} />);
    const toggle = screen.getByRole('switch', { name: 'Auto-approve' });
    expect(toggle).toBeDisabled();
    await user.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });
});
