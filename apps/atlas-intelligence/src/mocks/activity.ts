import type { ActivityFeedItem } from 'atlas-ui';
import type { ActivityPoint } from '@/types';

export const activity: ActivityPoint[] = [
  { date: 'May 12', processed: 18000, failed: 600 },
  { date: 'May 13', processed: 24500, failed: 800 },
  { date: 'May 14', processed: 19800, failed: 500 },
  { date: 'May 15', processed: 28600, failed: 900 },
  { date: 'May 16', processed: 26200, failed: 700 },
  { date: 'May 17', processed: 32500, failed: 1100 },
  { date: 'May 18', processed: 33800, failed: 950 },
];

export const recentActivity: ActivityFeedItem[] = [
  { id: 'a1', fileName: 'Invoice_9821.pdf', type: 'Invoice', status: 'Completed', time: '2m ago' },
  { id: 'a2', fileName: 'PO_2314.csv', type: 'Purchase Order', status: 'Completed', time: '15m ago' },
  { id: 'a3', fileName: 'Contract_v3.docx', type: 'Contract', status: 'Review', time: '1h ago' },
  { id: 'a4', fileName: 'Receipt_1298.jpg', type: 'Receipt', status: 'Completed', time: '2h ago' },
];
