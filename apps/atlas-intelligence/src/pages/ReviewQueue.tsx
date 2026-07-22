import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ConfidenceIndicator,
  EmptyState,
  IconButton,
  Pagination,
  SearchInput,
  Table,
  TableBody,
  TableCell,
  TableCheckboxCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBulkActionBar,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from 'atlas-ui';
import { Check, Download, FileX2, MoreHorizontal } from 'lucide-react';
import { useReviewStore } from '@/store/useReviewStore';
import type { DocumentStatus, DocumentType } from '@/types';

const STATUS_TONE: Record<DocumentStatus, 'review' | 'processing' | 'success' | 'danger' | 'warning'> = {
  Review: 'review',
  Processing: 'processing',
  Approved: 'success',
  Rejected: 'danger',
  'Changes Requested': 'warning',
};

const FILTERS: Array<{ key: 'all' | DocumentType; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'Invoice', label: 'Invoices' },
  { key: 'Contract', label: 'Contracts' },
  { key: 'Receipt', label: 'Receipts' },
];

type SortColumn = 'name' | 'confidence' | 'uploadedMinutesAgo';
type SortDirection = 'asc' | 'desc';

const PAGE_SIZE = 5;

export function ReviewQueue() {
  const { documents, resolveDocuments, showToast } = useReviewStore();
  const [filter, setFilter] = useState<'all' | DocumentType>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ column: SortColumn; direction: SortDirection }>({
    column: 'uploadedMinutesAgo',
    direction: 'asc',
  });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const byType = { Invoice: 0, Contract: 0, Receipt: 0 };
    for (const doc of documents) byType[doc.type]++;
    return { all: documents.length, ...byType };
  }, [documents]);

  const filtered = useMemo(() => {
    const byType = filter === 'all' ? documents : documents.filter((doc) => doc.type === filter);
    const query = search.trim().toLowerCase();
    const bySearch = query ? byType.filter((doc) => doc.name.toLowerCase().includes(query)) : byType;
    const sorted = [...bySearch].sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      if (sort.column === 'name') return a.name.localeCompare(b.name) * dir;
      return (a[sort.column] - b[sort.column]) * dir;
    });
    return sorted;
  }, [documents, filter, search, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const pageRows = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  function resetToFirstPage() {
    setPage(1);
  }

  function changeFilter(next: 'all' | DocumentType) {
    setFilter(next);
    setSelected(new Set());
    resetToFirstPage();
  }

  function changeSearch(next: string) {
    setSearch(next);
    setSelected(new Set());
    resetToFirstPage();
  }

  function toggleSort(column: SortColumn) {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: 'asc' }
    );
  }

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function toggleAllOnPage(checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const doc of pageRows) {
        if (checked) next.add(doc.id);
        else next.delete(doc.id);
      }
      return next;
    });
  }

  const pageRowIds = pageRows.map((d) => d.id);
  const allOnPageSelected = pageRowIds.length > 0 && pageRowIds.every((id) => selected.has(id));
  const someOnPageSelected = pageRowIds.some((id) => selected.has(id));

  function bulkApprove() {
    resolveDocuments([...selected], 'Approved');
    setSelected(new Set());
  }

  function bulkExport() {
    showToast({ tone: 'info', title: `Exporting ${selected.size} document${selected.size === 1 ? '' : 's'}…` });
    setSelected(new Set());
  }

  return (
    <div className="flex flex-col gap-5 px-8 py-7">
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem current>Review Queue</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-primary">Review Queue</h1>
          <p className="font-sans text-[13px] text-secondary">
            Review and validate extracted document data.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SearchInput
            value={search}
            onChange={(e) => changeSearch(e.target.value)}
            placeholder="Search documents…"
            className="w-64"
            aria-label="Search documents"
          />
          <Button variant="ghost" icon={<Download size={15} />}>
            Export
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => changeFilter(value as 'all' | DocumentType)}>
        <TabsList>
          {FILTERS.map((f) => (
            <Tab key={f.key} value={f.key} count={counts[f.key]}>
              {f.label}
            </Tab>
          ))}
        </TabsList>
        <TabPanel value={filter}>
          <div className="flex flex-col gap-3 pt-4">
            <TableBulkActionBar count={selected.size}>
              <Button
                variant="secondary"
                size="small"
                icon={<Check size={13} />}
                className="border-transparent bg-transparent text-table-bulk-text hover:bg-white/10"
                onClick={bulkApprove}
              >
                Approve selected
              </Button>
              <Button
                variant="secondary"
                size="small"
                icon={<Download size={13} />}
                className="border-transparent bg-transparent text-table-bulk-text hover:bg-white/10"
                onClick={bulkExport}
              >
                Export selected
              </Button>
            </TableBulkActionBar>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-border-default bg-surface">
                {documents.length === 0 ? (
                  <EmptyState
                    tone="success"
                    icon={<Check size={20} />}
                    title="All caught up"
                    description="There are no documents in the review queue right now."
                  />
                ) : (
                  <EmptyState
                    icon={<FileX2 size={20} />}
                    title="No documents match your search"
                    description="Try a different search term or clear the type filter."
                    action={
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => {
                          changeSearch('');
                          changeFilter('all');
                        }}
                      >
                        Clear filters
                      </Button>
                    }
                  />
                )}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCheckboxCell
                      as="th"
                      aria-label="Select all documents on this page"
                      checked={allOnPageSelected}
                      indeterminate={someOnPageSelected && !allOnPageSelected}
                      onChange={(e) => toggleAllOnPage(e.target.checked)}
                    />
                    <TableHeaderCell
                      sortDirection={sort.column === 'name' ? sort.direction : false}
                      onSort={() => toggleSort('name')}
                    >
                      Document
                    </TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell
                      sortDirection={sort.column === 'confidence' ? sort.direction : false}
                      onSort={() => toggleSort('confidence')}
                    >
                      Confidence
                    </TableHeaderCell>
                    <TableHeaderCell>Assigned To</TableHeaderCell>
                    <TableHeaderCell
                      sortDirection={sort.column === 'uploadedMinutesAgo' ? sort.direction : false}
                      onSort={() => toggleSort('uploadedMinutesAgo')}
                    >
                      Uploaded
                    </TableHeaderCell>
                    <TableHeaderCell aria-label="Actions" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCheckboxCell
                        aria-label={`Select ${doc.name}`}
                        checked={selected.has(doc.id)}
                        onChange={(e) => toggleRow(doc.id, e.target.checked)}
                      />
                      <TableCell className="font-medium">
                        <Link
                          to={`/review-queue/${encodeURIComponent(doc.id)}`}
                          className="rounded-sm text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2"
                        >
                          {doc.name}
                        </Link>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Badge tone={STATUS_TONE[doc.status]}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <ConfidenceIndicator value={doc.confidence} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar name={doc.assignee.name} size="small" />
                          <span>{doc.assignee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-tertiary">{doc.uploaded}</TableCell>
                      <TableCell>
                        <IconButton icon={<MoreHorizontal />} aria-label={`More options for ${doc.name}`} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {filtered.length > 0 && (
              <Pagination
                page={clampedPage}
                pageCount={pageCount}
                onPageChange={setPage}
                itemRange={{
                  from: (clampedPage - 1) * PAGE_SIZE + 1,
                  to: Math.min(clampedPage * PAGE_SIZE, filtered.length),
                  total: filtered.length,
                }}
              />
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
