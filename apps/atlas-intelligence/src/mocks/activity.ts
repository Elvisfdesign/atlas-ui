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

/** Analytics' own Recent Activity example — a distinct, wider slice than
 * Dashboard's (5 rows vs. 4, and a Failed row) per the Figma source, which
 * authors each screen's sample content independently. */
export const analyticsActivity: ActivityFeedItem[] = [
  { id: 'aa1', fileName: 'Invoice_9821.pdf', type: 'Invoice', status: 'Completed', time: '2m ago' },
  { id: 'aa2', fileName: 'PO_2314.csv', type: 'Purchase Order', status: 'Completed', time: '15m ago' },
  { id: 'aa3', fileName: 'Contract_v3.docx', type: 'Contract', status: 'Review', time: '1h ago' },
  { id: 'aa4', fileName: 'Receipt_1298.jpg', type: 'Receipt', status: 'Failed', time: '2h ago' },
  { id: 'aa5', fileName: 'Invoice_9819.pdf', type: 'Invoice', status: 'Completed', time: '2h ago' },
];
