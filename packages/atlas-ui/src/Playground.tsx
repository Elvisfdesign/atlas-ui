import { Bell, Check } from 'lucide-react';
import { Button } from './components/actions/Button';
import { IconButton } from './components/actions/IconButton';
import { Badge } from './components/feedback/Badge';
import { Avatar } from './components/data-display/Avatar';
import { KPICard } from './components/data-display/KPICard';
import { Tooltip } from './components/overlays/Tooltip';
import { useTheme } from './theme';

/**
 * A small manual smoke-test harness for `npm run dev` — not part of the
 * published library. Storybook (`npm run storybook`) is the real
 * documentation and development surface for each component.
 */
export function Playground() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-canvas p-12">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-primary">Atlas UI — Playground</h1>
          <Button variant="secondary" size="small" onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          </Button>
        </div>

        <section className="flex flex-wrap items-center gap-3">
          <Button>Approve</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="destructive">Delete</Button>
          <Button loading>Approving…</Button>
          <Button icon={<Check size={16} />}>Approve &amp; Continue</Button>
          <IconButton icon={<Bell />} aria-label="Notifications" />
        </section>

        <section className="flex flex-wrap gap-2">
          <Badge tone="success">Active</Badge>
          <Badge tone="warning">Pending</Badge>
          <Badge tone="danger">Failed</Badge>
          <Badge tone="ai">AI</Badge>
        </section>

        <section className="flex items-center gap-3">
          <Avatar name="Elvis Fernandes" color="inverse" />
          <Avatar name="Sophia Carter" size="small" />
          <Avatar name="James Okafor" size="small" />
          <Tooltip content="98% confidence · verified">
            <span className="cursor-default font-sans text-sm text-secondary underline decoration-dotted">
              Hover for confidence
            </span>
          </Tooltip>
        </section>

        <section className="flex gap-4">
          <KPICard
            label="TOTAL WORKFLOWS"
            value={128}
            trend="positive"
            trendValue="+12.5%"
            subtext="vs last 7 days"
          />
          <KPICard
            label="DOCUMENTS PROCESSED"
            value={342}
            trend="negative"
            trendValue="-4.3%"
            subtext="vs last 7 days"
          />
        </section>
      </div>
    </div>
  );
}
