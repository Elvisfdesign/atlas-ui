import { useMemo, useState } from 'react';
import { Button, EmptyState, SearchInput, Tab, TabPanel, Tabs, TabsList, WorkflowCard } from 'atlas-ui';
import { Plus, Workflow as WorkflowIcon } from 'lucide-react';
import { useReviewStore } from '@/store/useReviewStore';
import { workflowBoard } from '@/mocks/workflowBoard';

const FILTERS = ['All Workflows', 'Active', 'Draft', 'Scheduled', 'Archived'] as const;
type Filter = (typeof FILTERS)[number];

export function Workflows() {
  const { showToast } = useReviewStore();
  const [filter, setFilter] = useState<Filter>('All Workflows');
  const [search, setSearch] = useState('');

  const notWired = () =>
    showToast({ tone: 'info', title: 'Workflow creation is not wired up in this prototype yet' });

  const stages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return workflowBoard
      .map((stage) => ({
        ...stage,
        workflows: stage.workflows.filter((w) => {
          if (filter === 'Active' && w.status !== 'Active') return false;
          if (filter === 'Draft' && w.status !== 'Draft') return false;
          if (filter === 'Scheduled' || filter === 'Archived') return false;
          if (query && !w.title.toLowerCase().includes(query)) return false;
          return true;
        }),
      }))
      .filter((stage) => stage.workflows.length > 0 || (filter === 'All Workflows' && !query));
  }, [filter, search]);

  const totalVisible = stages.reduce((sum, s) => sum + s.workflows.length, 0);

  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-primary">Workflows</h1>
          <p className="font-sans text-[13px] text-secondary">
            Manage and automate your business processes.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workflows…"
            aria-label="Search workflows"
            className="w-56"
          />
          <Button icon={<Plus size={15} />} onClick={notWired}>
            Create Workflow
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as Filter)}>
        <TabsList>
          {FILTERS.map((f) => (
            <Tab key={f} value={f}>
              {f}
            </Tab>
          ))}
        </TabsList>
        <TabPanel value={filter}>
          {totalVisible === 0 ? (
            <div className="mt-4 rounded-xl border border-border-default bg-surface">
              <EmptyState
                icon={<WorkflowIcon size={20} />}
                title={search ? 'No workflows match your search' : `No ${filter.toLowerCase()} workflows`}
                description={
                  search
                    ? 'Try a different search term.'
                    : 'This prototype only seeds Active and Draft workflows.'
                }
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2 xl:grid-cols-4">
              {stages.map((stage) => (
                <div key={stage.id} className="flex flex-col gap-3 rounded-xl bg-surface-subtle p-3">
                  <div className="flex items-center gap-1.5 px-1 font-sans text-[13px] font-semibold text-primary">
                    {stage.name}
                    <span className="font-normal text-tertiary">
                      {stage.workflows.length} workflow{stage.workflows.length === 1 ? '' : 's'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {stage.workflows.map((workflow) => (
                      <WorkflowCard
                        key={workflow.id}
                        title={workflow.title}
                        description={workflow.description}
                        status={workflow.status}
                        volume={workflow.volume}
                        successRate={workflow.successRate}
                        onClick={notWired}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={notWired}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border-default py-2.5 font-sans text-[12.5px] text-secondary transition-colors hover:border-border-strong hover:text-primary"
                  >
                    <Plus size={13} aria-hidden="true" />
                    Add workflow
                  </button>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}
