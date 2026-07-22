import { ChartCard, EmptyState, LineChart } from 'atlas-ui';
import { BarChart3 } from 'lucide-react';
import { activity } from '@/mocks/activity';

export function Analytics() {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-primary">Analytics</h1>
        <p className="font-sans text-[13px] text-secondary">Track performance and document processing trends.</p>
      </div>

      <ChartCard title="Processing Over Time">
        <LineChart
          data={activity}
          xKey="date"
          series={[
            { key: 'processed', label: 'Processed', color: 'accent' },
            { key: 'failed', label: 'Failed', color: 'danger' },
          ]}
        />
      </ChartCard>

      <div className="rounded-xl border border-border-default bg-surface">
        <EmptyState
          icon={<BarChart3 size={20} />}
          title="More analytics are a future-phase build"
          description="Document-type breakdowns, team performance, and custom date ranges come in a later phase."
        />
      </div>
    </div>
  );
}
