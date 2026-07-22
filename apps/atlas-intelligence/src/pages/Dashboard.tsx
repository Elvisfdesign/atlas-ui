import { useNavigate } from 'react-router';
import {
  ActivityFeed,
  Badge,
  Button,
  ChartCard,
  IconButton,
  KPICard,
  LineChart,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'atlas-ui';
import { MoreHorizontal, Plus, Sparkles, UploadCloud } from 'lucide-react';
import { kpis } from '@/mocks/kpis';
import { activity, recentActivity } from '@/mocks/activity';
import { recentWorkflows } from '@/mocks/workflows';
import { useReviewStore } from '@/store/useReviewStore';
import type { ActivityFeedItem } from 'atlas-ui';
import type { WorkflowStatus } from '@/types';

const ITEMS_PROCESSED_BASELINE = 24853;

const STATUS_TONE: Record<WorkflowStatus, 'success' | 'processing' | 'review'> = {
  Active: 'success',
  Processing: 'processing',
  Review: 'review',
};

const QUICK_ACTIONS = [
  { icon: UploadCloud, title: 'Upload Documents', subtitle: 'Drag & drop or browse', path: '/review-queue' },
  { icon: Plus, title: 'Create Workflow', subtitle: 'Start from template', path: '/workflows' },
  { icon: Sparkles, title: 'Ask AI Assistant', subtitle: 'Get insights instantly', path: '/ai-assistant' },
] as const;

export function Dashboard() {
  const navigate = useNavigate();
  const { documents, approvedThisSession } = useReviewStore();

  // "Just now" only ever comes from a live resolveDocument call this
  // session — seed data uses relative strings like "1h ago" — so this
  // cleanly separates documents approved during this visit from the
  // baseline mock, without a separate session-tracking field.
  const liveActivity: ActivityFeedItem[] = documents
    .filter((doc) => doc.resolution?.action === 'Approved' && doc.resolution.time === 'Just now')
    .map((doc) => ({ id: `live-${doc.id}`, fileName: doc.name, type: doc.type, status: 'Completed', time: 'Just now' }));
  const activityItems = [...liveActivity, ...recentActivity].slice(0, 4);

  const itemsProcessedValue = (ITEMS_PROCESSED_BASELINE + approvedThisSession).toLocaleString();
  const kpisWithLiveValues = kpis.map((kpi) =>
    kpi.label === 'ITEMS PROCESSED' ? { ...kpi, value: itemsProcessedValue } : kpi
  );

  return (
    <div className="flex flex-col gap-8 px-8 py-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-primary">Good morning, Elvis</h1>
          <p className="font-sans text-[13px] text-secondary">Here&rsquo;s what&rsquo;s happening with your operations today.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" icon={<Sparkles size={15} />} onClick={() => navigate('/ai-assistant')}>
            Ask AI
          </Button>
          <Button icon={<Plus size={15} />} onClick={() => navigate('/workflows')}>
            New Workflow
          </Button>
          <IconButton icon={<MoreHorizontal />} aria-label="More dashboard options" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpisWithLiveValues.map((kpi) => (
          <KPICard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            trendValue={kpi.trendValue}
            subtext={kpi.subtext}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.75fr_1fr]">
        <ChartCard
          title="Activity Overview"
          action={
            <div className="flex items-center gap-3 font-sans text-[12.5px] text-secondary">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-interactive-accent" />
                Processed
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-interactive-danger" />
                Failed
              </span>
            </div>
          }
        >
          <LineChart
            data={activity}
            xKey="date"
            series={[
              { key: 'processed', label: 'Processed', color: 'accent' },
              { key: 'failed', label: 'Failed', color: 'danger' },
            ]}
          />
        </ChartCard>

        <ActivityFeed items={activityItems} onViewAll={() => navigate('/review-queue')} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.75fr_1fr]">
        <ChartCard title="Recent Workflows" action={<a href="/workflows" className="font-sans text-[12.5px] font-medium text-interactive-accent hover:text-interactive-accent-hover">View all</a>}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Items</TableHeaderCell>
                <TableHeaderCell>Accuracy</TableHeaderCell>
                <TableHeaderCell>Updated</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentWorkflows.map((workflow) => (
                <TableRow key={workflow.id}>
                  <TableCell className="font-medium">{workflow.name}</TableCell>
                  <TableCell>
                    <Badge tone={STATUS_TONE[workflow.status]}>{workflow.status}</Badge>
                  </TableCell>
                  <TableCell>{workflow.items.toLocaleString()}</TableCell>
                  <TableCell>{workflow.accuracy}</TableCell>
                  <TableCell className="text-tertiary">{workflow.updated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>

        <ChartCard title="Quick Actions">
          <div className="flex flex-col">
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className={`flex items-center gap-3 py-3 text-left transition-colors hover:bg-hover-surface ${
                    index > 0 ? 'border-t border-border-default' : ''
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-surface-subtle text-primary">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate font-sans text-[13px] font-medium text-primary">
                      {action.title}
                    </span>
                    <span className="truncate font-sans text-[12px] text-tertiary">{action.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
