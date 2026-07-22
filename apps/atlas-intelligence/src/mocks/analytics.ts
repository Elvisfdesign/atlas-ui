import type { DonutChartSlice } from 'atlas-ui';
import type { KpiSummary } from '@/types';

export const analyticsKpis: KpiSummary[] = [
  {
    label: 'TOTAL PROCESSED',
    value: '24,853',
    trend: 'positive',
    trendValue: '+18.2%',
    subtext: 'vs last 7 days',
  },
  {
    label: 'AVG ACCURACY',
    value: '98.6%',
    trend: 'positive',
    trendValue: '+2.1%',
    subtext: 'vs last 7 days',
  },
  {
    label: 'FAILED ITEMS',
    value: '342',
    trend: 'negative',
    trendValue: '-4.3%',
    subtext: 'vs last 7 days',
  },
  {
    label: 'AVG PROCESSING TIME',
    value: '2.4s',
    trend: 'negative',
    trendValue: '-8.4%',
    subtext: 'vs last 7 days',
  },
];

// Values are already percentages of the whole (sum to 100), matching the
// exact split shown in Figma's Document Types donut.
export const documentTypeSlices: DonutChartSlice[] = [
  { label: 'Invoices', value: 43, color: 'accent' },
  { label: 'Contracts', value: 28, color: 'processing' },
  { label: 'Receipts', value: 14, color: 'warning' },
  { label: 'Purchase Orders', value: 10, color: 'info' },
  { label: 'Others', value: 5, color: 'neutral' },
];
