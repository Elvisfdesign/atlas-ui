import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('associates the label via htmlFor', () => {
    render(<Textarea label="Notes" />);
    expect(screen.getByLabelText('Notes')).toBeInTheDocument();
  });

  it('accepts multi-line typed input', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Notes" />);
    const textarea = screen.getByLabelText('Notes');
    await user.type(textarea, 'Line one{enter}Line two');
    expect(textarea).toHaveValue('Line one\nLine two');
  });

  it('marks itself invalid and associates the error message', () => {
    render(<Textarea label="Notes" error="Notes are required" />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Notes are required');
  });

  it('blocks typing when disabled', async () => {
    const user = userEvent.setup();
    render(<Textarea label="Notes" disabled />);
    const textarea = screen.getByLabelText('Notes');
    expect(textarea).toBeDisabled();
    await user.type(textarea, 'test');
    expect(textarea).toHaveValue('');
  });
});
