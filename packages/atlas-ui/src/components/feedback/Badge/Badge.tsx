import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Atlas Badge.
 * Source: Atlas UI System, 09 — Feedback & Status → Feedback / Status Pill
 * (Tone variant set, 9 values). Status is always communicated by label text
 * *and* color together — never color alone.
 */
export const badgeVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-full px-2.5 py-[3px]',
    'font-sans font-medium text-[11.5px] leading-[16px]',
  ],
  {
    variants: {
      tone: {
        neutral: 'bg-border-subtle text-secondary',
        info: 'bg-info-bg text-info-text',
        success: 'bg-success-bg text-success-text',
        warning: 'bg-warning-bg text-warning-text',
        danger: 'bg-danger-bg text-danger-text',
        processing: 'bg-info-bg text-info-text',
        review: 'bg-warning-bg text-warning-text',
        draft: 'bg-border-subtle text-secondary',
        ai: 'bg-ai-bg text-border-focus',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...props} />
  )
);

Badge.displayName = 'Badge';
