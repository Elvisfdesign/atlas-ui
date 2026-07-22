import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableEmptyState,
  TableLoadingRows,
} from './Table';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableBulkActionBar } from './TableBulkActionBar';

function BasicTable() {
  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>Document</TableHeaderCell>
          <TableHeaderCell sortDirection="asc" onSort={() => {}}>
            Confidence
          </TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Invoice_2024.pdf</TableCell>
          <TableCell>96%</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table', () => {
  it('renders as a semantic table with header and body cells', () => {
    render(<BasicTable />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Document' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Invoice_2024.pdf' })).toBeInTheDocument();
  });

  it('marks a sortable header with aria-sort and fires onSort on click', async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();
    render(
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell sortDirection="asc" onSort={onSort}>
              Document
            </TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody />
      </Table>
    );
    const header = screen.getByRole('columnheader', { name: 'Document' });
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    await user.click(screen.getByRole('button', { name: /Document/ }));
    expect(onSort).toHaveBeenCalledOnce();
  });

  it('marks a selected row with data-selected', () => {
    render(
      <Table>
        <TableBody>
          <TableRow selected data-testid="row">
            <TableCell>Selected row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByTestId('row')).toHaveAttribute('data-selected', 'true');
  });

  it('renders TableEmptyState with the given title and description', () => {
    render(
      <Table>
        <TableBody>
          <TableEmptyState colSpan={2} title="No documents" description="Nothing to review yet." />
        </TableBody>
      </Table>
    );
    expect(screen.getByText('No documents')).toBeInTheDocument();
    expect(screen.getByText('Nothing to review yet.')).toBeInTheDocument();
  });

  it('renders TableLoadingRows as hidden placeholder rows', () => {
    render(
      <Table>
        <TableBody>
          <TableLoadingRows rows={3} columns={2} />
        </TableBody>
      </Table>
    );
    const rows = document.querySelectorAll('tbody tr[aria-hidden="true"]');
    expect(rows).toHaveLength(3);
  });
});

describe('TableCheckboxCell', () => {
  it('renders an accessible checkbox that fires onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <table>
        <tbody>
          <tr>
            <TableCheckboxCell aria-label="Select row" onChange={onChange} />
          </tr>
        </tbody>
      </table>
    );
    await user.click(screen.getByRole('checkbox', { name: 'Select row' }));
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe('TableBulkActionBar', () => {
  it('renders nothing when count is 0', () => {
    const { container } = render(<TableBulkActionBar count={0}>Actions</TableBulkActionBar>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a toolbar with the selection count when count > 0', () => {
    render(<TableBulkActionBar count={3}>Actions</TableBulkActionBar>);
    expect(screen.getByRole('toolbar', { name: '3 selected' })).toBeInTheDocument();
    expect(screen.getByText('3 selected')).toBeInTheDocument();
  });
});
