import type { ComponentType } from 'react';
import { EmptyState } from 'atlas-ui';

export interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number }>;
}

/** Shared body for sidebar destinations that have a nav entry in Atlas
 * Product but no designed screen yet (Data Explorer, AI Assistant,
 * Integrations, Teams) — see the Phase 1 plan's "Questions or assumptions"
 * #2: kept as real, navigable pages rather than hidden nav items. */
export function PlaceholderPage({ title, description, icon: Icon }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-primary">{title}</h1>
        <p className="font-sans text-[13px] text-secondary">{description}</p>
      </div>
      <div className="rounded-xl border border-border-default bg-surface">
        <EmptyState
          icon={<Icon size={20} />}
          title="Coming soon"
          description="We're still building out this part of the workspace. Check back soon."
        />
      </div>
    </div>
  );
}
