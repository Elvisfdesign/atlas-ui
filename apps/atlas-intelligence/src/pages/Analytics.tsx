import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ActivityFeed, Button, ChartCard, DonutChart, EmptyState, KPICard, LineChart, Tab, TabPanel, Tabs, TabsList } from 'atlas-ui';
import { Calendar, Sparkles, SlidersHorizontal } from 'lucide-react';
import { analyticsKpis, documentTypeSlices } from '@/mocks/analytics';
import { activity, analyticsActivity } from '@/mocks/activity';
import { useReviewStore } from '@/store/useReviewStore';

const SUB_TABS = ['Overview', 'Performance', 'Accuracy', 'Workflows', 'Users', 'AI Insights'] as const;
type SubTab = (typeof SUB_TABS)[number];

export function Analytics() {
  const navigate = useNavigate();
  const { showToast } = useReviewStore();
  const [tab, setTab] = useState<SubTab>('Overview');

  const notWired = () =>
    showToast({ tone: 'info', title: 'Custom date ranges and filters are not wired up in this prototype yet' });

  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-2xl font-semibold text-primary">Analytics</h1>
          <p className="font-sans text-[13px] text-secondary">Track performance and discover insights.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" icon={<Calendar size={15} />} onClick={notWired}>
            May 12 – May 18, 2025
          </Button>
          <Button variant="secondary" icon={<SlidersHorizontal size={15} />} onClick={notWired}>
            Filters
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(value) => setTab(value as SubTab)}>
        <TabsList>
          {SUB_TABS.map((t) => (
            <Tab key={t} value={t}>
              {t}
            </Tab>
          ))}
        </TabsList>

        <TabPanel value="Overview">
          <div className="flex flex-col gap-6 pt-5">
            <div className="flex gap-4 overflow-x-auto pb-1">
              {analyticsKpis.map((kpi) => (
                <KPICard
                  key={kpi.label}
                  className="shrink-0"
                  label={kpi.label}
                  value={kpi.value}
                  trend={kpi.trend}
                  trendValue={kpi.trendValue}
                  subtext={kpi.subtext}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <ChartCard
                title="Processing Over Time"
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

              <ChartCard title="Document Types">
                <DonutChart slices={documentTypeSlices} total="24,853" totalLabel="Total" />
              </ChartCard>
            </div>

            <ActivityFeed
              title="Recent Activity"
              items={analyticsActivity}
              onViewAll={() => navigate('/review-queue')}
            />
          </div>
        </TabPanel>

        {SUB_TABS.filter((t) => t !== 'Overview').map((t) => (
          <TabPanel key={t} value={t}>
            <div className="mt-4 rounded-xl border border-border-default bg-surface">
              <EmptyState
                icon={<Sparkles size={20} />}
                title={`${t} is a future-phase build`}
                description="This prototype covers the Overview tab only — deeper analytics breakdowns come in a later phase."
              />
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
