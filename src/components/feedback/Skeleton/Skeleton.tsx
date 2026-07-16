import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
}

const VARIANT_CLASSES: Record<NonNullable<SkeletonProps['variant']>, string> = {
  text: 'h-3.5 rounded-full',
  circle: 'rounded-full',
  rect: 'rounded-md',
};

/**
 * Atlas Skeleton. The shimmer placeholder primitive already used ad hoc
 * inside Table's `TableLoadingRows` and the chart components' `loading`
 * states — extracted here as its own reusable building block for any
 * future loading placeholder.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rect', width, height, style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('animate-pulse bg-surface-subtle', VARIANT_CLASSES[variant], className)}
      style={{ width, height, ...style }}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';
