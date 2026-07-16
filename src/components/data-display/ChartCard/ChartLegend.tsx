import { CHART_SERIES_COLORS, type ChartSeriesColor } from '@/components/data-display/shared/chartColors';
import { cn } from '@/utils/cn';

export interface ChartLegendItem {
  label: string;
  color: ChartSeriesColor;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

/**
 * The dot + label legend used in a Chart Card's header. Source: Atlas
 * Product's "Processing Over Time" legend (7px dot, 14px gap between
 * items, 12px secondary-color label).
 */
export function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <div className={cn('flex items-center gap-3.5', className)}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] shrink-0 rounded-full"
            style={{ backgroundColor: CHART_SERIES_COLORS[item.color] }}
          />
          <span className="whitespace-nowrap font-sans text-[12px] text-secondary">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
