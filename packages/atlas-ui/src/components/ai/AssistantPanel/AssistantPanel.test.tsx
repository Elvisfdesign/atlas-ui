import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AssistantPanel } from './AssistantPanel';

describe('AssistantPanel', () => {
  it('renders the title, badge, and messages', () => {
    render(
      <AssistantPanel messages={[{ id: '1', role: 'assistant', content: 'Hi there' }]} />
    );
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
    expect(screen.getByText('BETA')).toBeInTheDocument();
    expect(screen.getByText('Hi there')).toBeInTheDocument();
  });

  it('hides the badge when set to null', () => {
    render(<AssistantPanel messages={[]} badge={null} />);
    expect(screen.queryByText('BETA')).not.toBeInTheDocument();
  });

  it('renders suggested prompts and fires the click handler', async () => {
    const user = userEvent.setup();
    const onSuggestedPromptClick = vi.fn();
    render(
      <AssistantPanel
        messages={[]}
        suggestedPrompts={['Summarize this document']}
        onSuggestedPromptClick={onSuggestedPromptClick}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Summarize this document' }));
    expect(onSuggestedPromptClick).toHaveBeenCalledWith('Summarize this document');
  });

  it('submits a prompt via the composer', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AssistantPanel messages={[]} onSubmit={onSubmit} />);
    await user.type(screen.getByRole('textbox'), 'Check for anomalies');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledWith('Check for anomalies');
  });

  it('clears the composer after a submitted prompt', async () => {
    const user = userEvent.setup();
    render(<AssistantPanel messages={[]} onSubmit={vi.fn()} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'Check for anomalies');
    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(input).toHaveValue('');
  });

  it('announces new messages via an ARIA live log region', () => {
    render(<AssistantPanel messages={[{ id: '1', role: 'assistant', content: 'Hi there' }]} />);
    const log = screen.getByRole('log', { name: 'Conversation' });
    expect(log).toHaveAttribute('aria-live', 'polite');
    expect(log).toHaveAttribute('aria-relevant', 'additions');
  });

  it('renders the disclaimer', () => {
    render(<AssistantPanel messages={[]} />);
    expect(screen.getByText('AI responses may be inaccurate.')).toBeInTheDocument();
  });
});
