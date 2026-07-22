import type { KpiSummary } from '@/types';

export const kpis: KpiSummary[] = [
  {
    label: 'TOTAL WORKFLOWS',
    value: '128',
    trend: 'positive',
    trendValue: '+12.5%',
    subtext: 'vs last 7 days',
  },
  {
    label: 'ITEMS PROCESSED',
    value: '24,853',
    trend: 'positive',
    trendValue: '+18.2%',
    subtext: 'vs last 7 days',
  },
  {
    label: 'ACCURACY',
    value: '98.6%',
    trend: 'positive',
    trendValue: '+2.1%',
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
