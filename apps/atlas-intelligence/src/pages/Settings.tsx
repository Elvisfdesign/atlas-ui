import { useState } from 'react';
import {
  Avatar,
  Button,
  EmptyState,
  Input,
  Select,
  Switch,
  Tab,
  TabPanel,
  Tabs,
  TabsList,
  useTheme,
} from 'atlas-ui';
import { Camera, Settings as SettingsIcon } from 'lucide-react';

const SUB_TABS = ['General', 'Team', 'Security', 'Integrations', 'Billing', 'Advanced'] as const;
type SubTab = (typeof SUB_TABS)[number];

const CURRENT_USER = { name: 'Elvis Meraz', email: 'elvisfdesign@gmail.com', role: 'Admin' };

interface PreferenceToggle {
  key: string;
  title: string;
  description: string;
}

const PREFERENCE_TOGGLES: PreferenceToggle[] = [
  { key: 'email', title: 'Email Notifications', description: 'Receive updates via email' },
  { key: 'inApp', title: 'In-app Notifications', description: 'Receive updates in the app' },
  { key: 'digest', title: 'Weekly Digest', description: 'Summary of weekly activity' },
  { key: 'autoAssign', title: 'Auto-assign Workflows', description: 'Automatically assign new workflows' },
];

export function Settings() {
  const { resolvedTheme, setTheme } = useTheme();
  const [tab, setTab] = useState<SubTab>('General');
  const [workspaceName, setWorkspaceName] = useState('Atlas Intelligence');
  const [industry, setIndustry] = useState('Technology');
  const [currency, setCurrency] = useState('USD');
  const [timezone, setTimezone] = useState('America/New_York');
  const [language, setLanguage] = useState('en');
  const [toggles, setToggles] = useState({ email: true, inApp: true, digest: true, autoAssign: false });

  return (
    <div className="flex flex-col gap-6 px-8 py-7">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-2xl font-semibold text-primary">Settings</h1>
        <p className="font-sans text-[13px] text-secondary">Manage your workspace settings and preferences.</p>
      </div>

      <Tabs value={tab} onValueChange={(value) => setTab(value as SubTab)}>
        <TabsList>
          {SUB_TABS.map((t) => (
            <Tab key={t} value={t}>
              {t}
            </Tab>
          ))}
        </TabsList>

        <TabPanel value="General">
          <div className="flex flex-col gap-4 pt-5">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border-default bg-surface p-5">
              <div className="flex items-center gap-3">
                <Avatar name={CURRENT_USER.name} size="medium" />
                <div className="flex flex-col">
                  <span className="font-sans text-[14.5px] font-semibold text-primary">{CURRENT_USER.name}</span>
                  <span className="font-sans text-[12.5px] text-tertiary">
                    {CURRENT_USER.email} · {CURRENT_USER.role}
                  </span>
                </div>
              </div>
              <Button variant="secondary" size="small" icon={<Camera size={14} />}>
                Change Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
              <div className="flex flex-col gap-5 rounded-xl border border-border-default bg-surface p-5">
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-sans text-[14.5px] font-semibold text-primary">Workspace</h2>
                  <p className="font-sans text-[12.5px] text-tertiary">
                    General information about your workspace
                  </p>
                </div>

                <Input
                  label="Workspace Name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                />
                <Input label="Workspace ID" value="ws_87718c2d4e6b" readOnly />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                  </Select>
                  <Select label="Default Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select label="Timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option value="America/New_York">(GMT-04:00) Eastern Time (US &amp; Canada)</option>
                    <option value="America/Los_Angeles">(GMT-07:00) Pacific Time (US &amp; Canada)</option>
                    <option value="Europe/London">(GMT+01:00) London</option>
                  </Select>
                  <Select label="Language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-5 rounded-xl border border-border-default bg-surface p-5">
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-sans text-[14.5px] font-semibold text-primary">Preferences</h2>
                  <p className="font-sans text-[12.5px] text-tertiary">Notification and workspace behavior</p>
                </div>

                <div className="flex flex-col divide-y divide-border-default">
                  {PREFERENCE_TOGGLES.map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between gap-4 py-3 first:pt-0">
                      <div className="flex flex-col">
                        <span className="font-sans text-[13px] font-medium text-primary">{pref.title}</span>
                        <span className="font-sans text-[12px] text-tertiary">{pref.description}</span>
                      </div>
                      <Switch
                        aria-label={pref.title}
                        checked={toggles[pref.key as keyof typeof toggles]}
                        onChange={(e) =>
                          setToggles((prev) => ({ ...prev, [pref.key]: e.target.checked }))
                        }
                      />
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-sans text-[13px] font-medium text-primary">Dark Mode</span>
                      <span className="font-sans text-[12px] text-tertiary">Switch to dark appearance</span>
                    </div>
                    <Switch
                      aria-label="Dark Mode"
                      checked={resolvedTheme === 'dark'}
                      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {SUB_TABS.filter((t) => t !== 'General').map((t) => (
          <TabPanel key={t} value={t}>
            <div className="mt-4 rounded-xl border border-border-default bg-surface">
              <EmptyState
                icon={<SettingsIcon size={20} />}
                title={`${t} is a future-phase build`}
                description="This prototype covers General settings only — the rest come in a later phase."
              />
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
