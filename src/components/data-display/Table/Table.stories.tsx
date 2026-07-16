import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/actions/Button';
import { Badge } from '@/components/feedback/Badge';
import { FileRow } from '@/components/data-display/FileRow';
import { UserRow } from '@/components/data-display/UserRow';
import { ConfidenceIndicator } from '@/components/data-display/ConfidenceIndicator';
import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell, TableEmptyState, TableLoadingRows } from './Table';
import { TableCheckboxCell } from './TableCheckboxCell';
import { TableBulkActionBar } from './TableBulkActionBar';

const ROWS = [
  { id: '1', file: 'Invoice_2024_1847.pdf', type: 'Invoice', confidence: 96, assignee: 'Sophia Carter', status: 'Reviewed' as const },
  { id: '2', file: 'Contract_Vendor_A.pdf', type: 'Contract', confidence: 82, assignee: 'James Okafor', status: 'Processing' as const },
  { id: '3', file: 'Receipt_0472.pdf', type: 'Receipt', confidence: 61, assignee: 'Rin Tanaka', status: 'Needs Review' as const },
];

const STATUS_TONE = {
  Reviewed: 'success',
  Processing: 'info',
  'Needs Review': 'warning',
} as const;

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

function ReviewQueueTable({ density }: { density?: 'comfortable' | 'dense' }) {
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);

  const allSelected = selected.length === ROWS.length;
  const someSelected = selected.length > 0 && !allSelected;

  return (
    <div className="flex flex-col gap-3">
      <TableBulkActionBar count={selected.length}>
        <Button size="small" variant="secondary" onClick={() => setSelected([])}>
          Clear
        </Button>
        <Button size="small" variant="primary">
          Approve selected
        </Button>
      </TableBulkActionBar>
      <Table density={density}>
        <TableHeader>
          <tr>
            <TableCheckboxCell
              as="th"
              aria-label="Select all rows"
              checked={allSelected}
              indeterminate={someSelected}
              onChange={() => setSelected(allSelected ? [] : ROWS.map((r) => r.id))}
            />
            <TableHeaderCell
              sortDirection={sortDirection}
              onSort={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
            >
              Document
            </TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Confidence</TableHeaderCell>
            <TableHeaderCell>Assignee</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {ROWS.map((row) => (
            <TableRow key={row.id} selected={selected.includes(row.id)}>
              <TableCheckboxCell
                aria-label={`Select ${row.file}`}
                checked={selected.includes(row.id)}
                onChange={() =>
                  setSelected((prev) =>
                    prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id]
                  )
                }
              />
              <TableCell>
                <FileRow fileName={row.file} />
              </TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                <ConfidenceIndicator value={row.confidence} />
              </TableCell>
              <TableCell>
                <UserRow name={row.assignee} />
              </TableCell>
              <TableCell>
                <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const Default: Story = {
  render: () => <ReviewQueueTable />,
};

export const Dense: Story = {
  render: () => <ReviewQueueTable density="dense" />,
};

export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>Document</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Confidence</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableEmptyState
          colSpan={3}
          title="No documents in the review queue"
          description="Documents will appear here once they're submitted for processing."
        />
      </TableBody>
    </Table>
  ),
};

export const Loading: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>Document</TableHeaderCell>
          <TableHeaderCell>Type</TableHeaderCell>
          <TableHeaderCell>Confidence</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        <TableLoadingRows columns={3} />
      </TableBody>
    </Table>
  ),
};
