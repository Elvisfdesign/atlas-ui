import type { NotificationItem } from '@/types';

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Invoice_9821.pdf needs review',
    description: 'AI extraction complete — 96% avg. confidence',
    time: '2m ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Vendor Onboarding workflow updated',
    description: 'Contract_v3.docx flagged for review',
    time: '1h ago',
    read: false,
  },
  {
    id: 'n3',
    title: 'Weekly accuracy report ready',
    description: '98.6% accuracy across 24,853 items',
    time: '2h ago',
    read: true,
  },
  {
    id: 'n4',
    title: 'Receipt_1298.jpg processed',
    description: '6 fields extracted',
    time: '5h ago',
    read: true,
  },
];
