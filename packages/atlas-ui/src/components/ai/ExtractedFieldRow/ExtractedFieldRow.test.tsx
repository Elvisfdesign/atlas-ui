import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExtractedFieldRow } from './ExtractedFieldRow';

describe('ExtractedFieldRow', () => {
  it('renders the label and value', () => {
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />);
    expect(screen.getByText('Vendor Name')).toBeInTheDocument();
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
  });

  it('renders a Confidence Badge for the value', () => {
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />);
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '98% confidence' })).toBeInTheDocument();
  });

  it('does not render an edit affordance by default', () => {
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} />);
    expect(screen.queryByRole('button', { name: 'Edit Vendor Name' })).not.toBeInTheDocument();
  });

  it('turns the value into an input when editable and the edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} editable />);

    await user.click(screen.getByRole('button', { name: 'Edit Vendor Name' }));

    expect(screen.getByRole('textbox', { name: 'Vendor Name' })).toHaveValue('Acme Corporation');
  });

  it('calls onSave with the trimmed value on Enter', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} editable onSave={onSave} />
    );

    await user.click(screen.getByRole('button', { name: 'Edit Vendor Name' }));
    const input = screen.getByRole('textbox', { name: 'Vendor Name' });
    await user.clear(input);
    await user.type(input, '  Acme Corp  {Enter}');

    expect(onSave).toHaveBeenCalledWith('Acme Corp');
    expect(screen.getByText('Vendor Name')).toBeInTheDocument();
  });

  it('reverts without calling onSave on Escape', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} editable onSave={onSave} />
    );

    await user.click(screen.getByRole('button', { name: 'Edit Vendor Name' }));
    const input = screen.getByRole('textbox', { name: 'Vendor Name' });
    await user.type(input, ' extra{Escape}');

    expect(onSave).not.toHaveBeenCalled();
    expect(screen.getByText('Acme Corporation')).toBeInTheDocument();
  });

  it('shows a brief save-confirmation flash after committing a change', async () => {
    const user = userEvent.setup();
    render(
      <ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} editable onSave={vi.fn()} />
    );

    await user.click(screen.getByRole('button', { name: 'Edit Vendor Name' }));
    const input = screen.getByRole('textbox', { name: 'Vendor Name' });
    await user.clear(input);
    await user.type(input, 'Acme Corp{Enter}');

    expect(screen.getByText('Vendor Name').closest('div')?.parentElement).toHaveClass('atlas-save-flash');
  });

  it('does not call onSave when the value is unchanged', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(
      <ExtractedFieldRow label="Vendor Name" value="Acme Corporation" confidence={98} editable onSave={onSave} />
    );

    await user.click(screen.getByRole('button', { name: 'Edit Vendor Name' }));
    await user.keyboard('{Enter}');

    expect(onSave).not.toHaveBeenCalled();
  });
});
