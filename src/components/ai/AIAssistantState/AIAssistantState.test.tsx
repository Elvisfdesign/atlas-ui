import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AIAssistantState } from './AIAssistantState';

describe('AIAssistantState', () => {
  it('renders the title and description', () => {
    render(<AIAssistantState title="Thinking…" description="Reading the document." />);
    expect(screen.getByText('Thinking…')).toBeInTheDocument();
    expect(screen.getByText('Reading the document.')).toBeInTheDocument();
  });

  it('marks the processing status with role="status"', () => {
    render(<AIAssistantState status="processing" title="Thinking…" />);
    expect(screen.getByRole('status')).toHaveTextContent('Thinking…');
  });

  it('does not use role="status" for the error status', () => {
    render(<AIAssistantState status="error" title="Something went wrong" />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders the provided action', () => {
    render(
      <AIAssistantState
        status="error"
        title="Something went wrong"
        action={<button type="button">Try again</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
