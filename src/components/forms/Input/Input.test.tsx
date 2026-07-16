import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates the label with the input via htmlFor', () => {
    render(<Input label="Workspace name" />);
    expect(screen.getByLabelText('Workspace name')).toBeInTheDocument();
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    render(<Input label="Workspace name" />);
    const input = screen.getByLabelText('Workspace name');
    await user.type(input, 'Acme Inc.');
    expect(input).toHaveValue('Acme Inc.');
  });

  it('fires onChange as the user types', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input label="Workspace name" onChange={onChange} />);
    await user.type(screen.getByLabelText('Workspace name'), 'A');
    expect(onChange).toHaveBeenCalled();
  });

  it('marks itself invalid and associates the error message when `error` is set', () => {
    render(<Input label="Workspace name" error="Workspace name is required" />);
    const input = screen.getByLabelText('Workspace name');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const message = screen.getByRole('alert');
    expect(message).toHaveTextContent('Workspace name is required');
    expect(input).toHaveAttribute('aria-describedby', message.id);
  });

  it('blocks typing when disabled', async () => {
    const user = userEvent.setup();
    render(<Input label="Workspace name" disabled />);
    const input = screen.getByLabelText('Workspace name');
    expect(input).toBeDisabled();
    await user.type(input, 'test');
    expect(input).toHaveValue('');
  });
});
