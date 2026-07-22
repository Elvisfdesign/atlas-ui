import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_SERIES_COLORS, type ChartSeriesColor } from '@/components/data-display/shared/chartColors';
import { cn } from '@/utils/cn';

export interface LineChartSeries {
  /** Key into each data row. */
  key: string;
  label: string;
  color: ChartSeriesColor;
}

export interface LineChartProps {
  /** Row objects, each containing `xKey` and every series `key`. */
  data: Array<Record<string, number | string>>;
  xKey: string;
  series: LineChartSeries[];
  height?: number;
  loading?: boolean;
  /** Shown instead of the chart when `data` is empty. */
  emptyMessage?: string;
  className?: string;
}

function formatYAxisTick(value: number): string {
  if (Math.abs(value) >= 1000) return `${value / 1000}K`;
  return String(value);
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border-default bg-surface-elevated px-3 py-2 shadow-elevation-medium">
      <p className="mb-1 font-sans text-[11.5px] font-medium text-tertiary">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-sans text-[12.5px] text-primary">
            {entry.name}: {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Atlas Line Chart. Source: Atlas Product's Analytics "Processing Over
 * Time" chart — a K-formatted y-axis, dated x-axis, and one filled area
 * per series (Processed/Failed), each colored from an existing semantic
 * token via `CHART_SERIES_COLORS`. Reusable and data-agnostic; product
 * data is never hardcoded inside it. Built on `recharts` rather than a
 * custom charting engine.
 */
export function LineChart({
  data,
  xKey,
  series,
  height = 240,
  loading = false,
  emptyMessage = 'No data to display yet.',
  className,
}: LineChartProps) {
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Loading chart"
        className={cn('w-full animate-pulse rounded-md bg-surface-subtle', className)}
        style={{ height }}
      />
    );
  }

  if (data.length === 0) {
    return (
      <div
        className={cn(
          'flex w-full items-center justify-center rounded-md border border-dashed border-border-default text-[12.5px] text-tertiary',
          className
        )}
        style={{ height }}
      >
        {emptyMessage}
      </div>
    );
  }

  const summary = series
    .map((s) => {
      const values = data.map((row) => row[s.key]).filter((v): v is number => typeof v === 'number');
      if (values.length === 0) return `${s.label}: no data`;
      return `${s.label}: ${values[0]} to ${values[values.length - 1]}`;
    })
    .join('. ');
  const firstX = data[0]?.[xKey];
  const lastX = data[data.length - 1]?.[xKey];

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      {/* Recharts renders an inert SVG with no text alternative for the
          actual trend — this gives screen reader users the same "what
          happened" a sighted user gets from glancing at the line, without
          requiring them to parse individual data points. */}
      <p className="sr-only">
        {series.length > 1 ? 'Line chart' : 'Chart'} from {firstX} to {lastX}. {summary}.
      </p>
      <ResponsiveContainer width="100%" height="100%">
        {/* `accessibilityLayer={false}` — Recharts' default keyboard/ARIA
            layer leaves its root SVG focusable (`tabIndex=0`) while also
            hiding it (`aria-hidden`), which is a real bug: a focusable
            element removed from the accessibility tree, landing keyboard
            users on a dead stop with nothing announced. The sr-only
            summary above is this chart's actual accessible content. */}
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          accessibilityLayer={false}
        >
          <CartesianGrid vertical={false} stroke="var(--color-border-subtle)" />
          <XAxis
            dataKey={xKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--color-tertiary)', fontSize: 11.5 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--color-tertiary)', fontSize: 11.5 }}
            tickFormatter={formatYAxisTick}
            width={36}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--color-border-strong)' }} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={CHART_SERIES_COLORS[s.color]}
              fill={CHART_SERIES_COLORS[s.color]}
              fillOpacity={0.12}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 3 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
