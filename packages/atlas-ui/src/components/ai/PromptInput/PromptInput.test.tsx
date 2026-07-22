import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromptInput } from './PromptInput';

describe('PromptInput', () => {
  it('renders a textbox with the placeholder', () => {
    render(<PromptInput />);
    expect(screen.getByPlaceholderText('Ask anything about this document...')).toBeInTheDocument();
  });

  it('fires onSubmit with the trimmed value when the send button is clicked', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox'), '  Summarize this  ');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledWith('Summarize this');
  });

  it('does not fire onSubmit for an empty value', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<PromptInput onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('disables the field and send button when disabled', () => {
    render(<PromptInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send' })).toBeDisabled();
  });
});
