import {
  BarChart3,
  ClipboardCheck,
  Database,
  Home,
  Plug,
  Settings,
  Sparkles,
  Users,
  Workflow,
} from 'lucide-react';
import type { NavItem } from '@/types';

/**
 * Single source of truth for the sidebar, mirroring Atlas Product's two nav
 * groups exactly (primary group, then a divider, then Teams/Settings).
 * Review Queue's count is populated at render time from mock data, not here.
 */
export const primaryNavItems: NavItem[] = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Review Queue', path: '/review-queue', icon: ClipboardCheck },
  { label: 'Workflows', path: '/workflows', icon: Workflow },
  { label: 'Data Explorer', path: '/data-explorer', icon: Database },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'AI Assistant', path: '/ai-assistant', icon: Sparkles },
  { label: 'Integrations', path: '/integrations', icon: Plug },
];

export const secondaryNavItems: NavItem[] = [
  { label: 'Teams', path: '/teams', icon: Users },
  { label: 'Settings', path: '/settings', icon: Settings },
];
