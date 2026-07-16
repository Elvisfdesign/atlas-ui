import { forwardRef, type HTMLAttributes } from 'react';
import { MoreHorizontal, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas KPI Card.
 * Source: Atlas UI System, 08 — Data Display → Data / KPI Card
 * (Trend variant set: Positive/Negative). 260×130, padding 20, radius 12,
 * `background-surface` fill with a `border-default` hairline — no shadow.
 *
 * Note: the Figma component's numeric-metric text is 26px, while the named
 * `Numeric Metric` type-scale token in Foundations documents 28px — a small
 * existing drift between the token and its most visible usage. This
 * implementation matches the actual KPI Card as built (26px), since that's
 * the literal, shipped Product/DS artifact.
 */
export interface KPICardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Small uppercase label, e.g. "TOTAL WORKFLOWS". */
  label: string;
  /** The headline number, e.g. 128 or "24,853". */
  value: string | number;
  /** Direction of the trend indicator and its color (success/danger). */
  trend: 'positive' | 'negative';
  /** The trend figure, e.g. "+12.5%" or "-4.3%". */
  trendValue: string;
  /** Comparison caption, e.g. "vs last 7 days". */
  subtext: string;
  /** Shows the overflow ("more options") affordance in the top-right corner. */
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const KPICard = forwardRef<HTMLDivElement, KPICardProps>(
  (
    {
      className,
      label,
      value,
      trend,
      trendValue,
      subtext,
      showMenu = false,
      onMenuClick,
      ...props
    },
    ref
  ) => {
    const TrendIcon = trend === 'positive' ? TrendingUp : TrendingDown;
    const trendColor = trend === 'positive' ? 'text-success-text' : 'text-danger-text';

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-[260px] flex-col gap-3 rounded-lg border border-border-default bg-surface p-5',
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium tracking-[0.3px] text-tertiary">
            {label}
          </span>
          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              aria-label={`More options for ${label}`}
              className="text-disabled transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2"
            >
              <MoreHorizontal size={13} aria-hidden="true" />
            </button>
          )}
        </div>

        <span className="font-sans text-[26px] font-semibold leading-none text-inverse">
          {value}
        </span>

        <div className="flex items-center gap-1.5">
          <TrendIcon size={14} aria-hidden="true" className={trendColor} />
          <span className={cn('font-sans text-[11.5px] font-medium', trendColor)}>
            {trendValue}
          </span>
          <span className="font-sans text-[11.5px] text-disabled">{subtext}</span>
        </div>
      </div>
    );
  }
);

KPICard.displayName = 'KPICard';
