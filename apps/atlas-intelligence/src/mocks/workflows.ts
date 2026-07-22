import type { WorkflowSummary } from '@/types';

export const recentWorkflows: WorkflowSummary[] = [
  {
    id: 'w1',
    name: 'Invoice Processing',
    status: 'Active',
    items: 2453,
    accuracy: '98.7%',
    updated: '2m ago',
  },
  {
    id: 'w2',
    name: 'Vendor Onboarding',
    status: 'Processing',
    items: 1120,
    accuracy: '97.2%',
    updated: '15m ago',
  },
  {
    id: 'w3',
    name: 'Contract Analysis',
    status: 'Review',
    items: 842,
    accuracy: '99.1%',
    updated: '1h ago',
  },
  {
    id: 'w4',
    name: 'Expense Monitoring',
    status: 'Active',
    items: 1982,
    accuracy: '98.0%',
    updated: '2h ago',
  },
];
