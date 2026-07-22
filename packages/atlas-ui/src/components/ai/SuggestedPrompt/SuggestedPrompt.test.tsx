import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuggestedPrompt } from './SuggestedPrompt';

describe('SuggestedPrompt', () => {
  it('renders as a button with its text', () => {
    render(<SuggestedPrompt>Summarize this document</SuggestedPrompt>);
    expect(screen.getByRole('button', { name: 'Summarize this document' })).toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<SuggestedPrompt onClick={onClick}>Check for anomalies</SuggestedPrompt>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
