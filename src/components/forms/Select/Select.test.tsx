import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

function Options() {
  return (
    <>
      <option value="invoice">Invoice</option>
      <option value="contract">Contract</option>
    </>
  );
}

describe('Select', () => {
  it('associates the label via htmlFor', () => {
    render(
      <Select label="Document type">
        <Options />
      </Select>
    );
    expect(screen.getByLabelText('Document type')).toBeInTheDocument();
  });

  it('changes value via keyboard selection', async () => {
    const user = userEvent.setup();
    render(
      <Select label="Document type">
        <Options />
      </Select>
    );
    const select = screen.getByLabelText('Document type') as HTMLSelectElement;
    await user.selectOptions(select, 'contract');
    expect(select.value).toBe('contract');
  });

  it('marks itself invalid and associates the error message', () => {
    render(
      <Select label="Document type" error="Select a document type">
        <Options />
      </Select>
    );
    const select = screen.getByLabelText('Document type');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Select a document type');
  });

  it('blocks selection changes when disabled', () => {
    render(
      <Select label="Document type" disabled defaultValue="invoice">
        <Options />
      </Select>
    );
    expect(screen.getByLabelText('Document type')).toBeDisabled();
  });
});
