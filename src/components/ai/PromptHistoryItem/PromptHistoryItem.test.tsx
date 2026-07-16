import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PromptHistoryItem } from './PromptHistoryItem';

describe('PromptHistoryItem', () => {
  it('renders the prompt, response, and time', () => {
    render(<PromptHistoryItem prompt="Summarize this document" response="It's an invoice." time="2m ago" />);
    expect(screen.getByText('Summarize this document')).toBeInTheDocument();
    expect(screen.getByText("It's an invoice.")).toBeInTheDocument();
    expect(screen.getByText('2m ago')).toBeInTheDocument();
  });

  it('omits the response line when none is given', () => {
    render(<PromptHistoryItem prompt="What's the status?" time="3h ago" />);
    expect(screen.queryByText(/invoice/)).not.toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<PromptHistoryItem prompt="Summarize this document" time="2m ago" onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
