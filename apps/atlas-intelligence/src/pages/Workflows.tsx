import { Button, EmptyState } from 'atlas-ui';
import { Plus, Workflow } from 'lucide-react';

export function Workflows() {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-primary">Workflows</h1>
          <p className="font-sans text-[13px] text-secondary">Build and manage document-processing workflows.</p>
        </div>
        <Button icon={<Plus size={15} />}>New Workflow</Button>
      </div>
      <div className="rounded-xl border border-border-default bg-surface">
        <EmptyState
          icon={<Workflow size={20} />}
          title="Workflow Builder is a future-phase build"
          description="Phase 1 covers the app shell and navigation only — the drag-and-drop builder canvas comes in a later phase."
        />
      </div>
    </div>
  );
}
