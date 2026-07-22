import { EmptyState } from 'atlas-ui';
import { Settings as SettingsIcon } from 'lucide-react';

export function Settings() {
  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-primary">Settings</h1>
        <p className="font-sans text-[13px] text-secondary">Manage your account and workspace preferences.</p>
      </div>
      <div className="rounded-xl border border-border-default bg-surface">
        <EmptyState
          icon={<SettingsIcon size={20} />}
          title="Settings is a future-phase build"
          description="Profile, workspace, and notification preferences come in a later phase."
        />
      </div>
    </div>
  );
}
