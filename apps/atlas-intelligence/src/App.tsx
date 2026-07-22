import { Button, KPICard, useTheme } from 'atlas-ui';

/**
 * Phase 0 proof-of-integration screen only — not the Atlas Intelligence
 * product shell. Confirms this app consumes Atlas UI purely through its
 * public package export surface (no deep imports, no copied components).
 */
export function App() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <div style={{ minHeight: '100vh' }} className="bg-canvas p-12">
      <div style={{ maxWidth: 640, margin: '0 auto' }} className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="font-sans text-2xl font-semibold text-primary">Atlas Intelligence</h1>
          <Button variant="secondary" size="small" onClick={toggleTheme}>
            {resolvedTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          </Button>
        </div>

        <KPICard
          label="ATLAS UI INTEGRATION"
          value="Connected"
          trend="positive"
          trendValue="workspace:*"
          subtext="atlas-intelligence is consuming atlas-ui via its package export surface"
        />

        <Button>Approve</Button>
      </div>
    </div>
  );
}
