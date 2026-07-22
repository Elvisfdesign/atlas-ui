import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { CHART_SERIES_COLORS, type ChartSeriesColor } from '@/components/data-display/shared/chartColors';
import { cn } from '@/utils/cn';

export interface DonutChartSlice {
  label: string;
  value: number;
  color: ChartSeriesColor;
}

export interface DonutChartProps {
  slices: DonutChartSlice[];
  /** The number shown in the donut's center, e.g. a formatted total ("24,853"). */
  total: string;
  totalLabel?: string;
  size?: number;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

function formatPercent(value: number, sum: number): string {
  if (sum === 0) return '0%';
  return `${Math.round((value / sum) * 100)}%`;
}

/**
 * Atlas Donut Chart. Source: Atlas Product's Analytics "Document Types"
 * chart — a donut with a centered total + label, and a legend column
 * (dot, label, percentage) to its right. `slices` colors reference the
 * same `CHART_SERIES_COLORS` palette as Line Chart, so every categorical
 * chart in Atlas draws from one governed set. Reusable and data-agnostic.
 */
export function DonutChart({
  slices,
  total,
  totalLabel = 'Total',
  size = 180,
  loading = false,
  emptyMessage = 'No data to display yet.',
  className,
}: DonutChartProps) {
  const sum = slices.reduce((acc, s) => acc + s.value, 0);

  if (loading) {
    return (
      <div className={cn('flex items-center gap-6', className)}>
        <div
          className="shrink-0 animate-pulse rounded-full bg-surface-subtle"
          style={{ width: size, height: size }}
        />
      </div>
    );
  }

  if (slices.length === 0 || sum === 0) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-md border border-dashed border-border-default text-[12.5px] text-tertiary',
          className
        )}
        style={{ height: size }}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center gap-6', className)}>
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <ResponsiveContainer width="100%" height="100%">
          {/* accessibilityLayer={false} — Recharts' default keyboard layer
              makes the root SVG a `tabIndex=0` `role="application"` region,
              which would land keyboard users on a redundant, disruptive tab
              stop: the legend beside the chart (real text, not aria-hidden)
              already carries every value this pie shows. */}
          <PieChart accessibilityLayer={false}>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={2}
              stroke="none"
              isAnimationActive={false}
            >
              {slices.map((slice) => (
                <Cell key={slice.label} fill={CHART_SERIES_COLORS[slice.color]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-sans text-[19px] font-semibold text-primary">{total}</span>
          <span className="font-sans text-[11px] text-tertiary">{totalLabel}</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {slices.map((slice) => (
          <div key={slice.label} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: CHART_SERIES_COLORS[slice.color] }}
            />
            <span className="min-w-0 flex-1 truncate font-sans text-[12.5px] text-secondary">
              {slice.label}
            </span>
            <span className="shrink-0 font-sans text-[12.5px] font-medium text-primary">
              {formatPercent(slice.value, sum)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
