import { type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas AI Label.
 * Source: Atlas Product — the AI Assistant panel's "BETA" chip (Document
 * Review, `ai-head` → `beta`): a rectangular micro-tag, distinct from
 * Badge's pill-shaped status tones, used to flag an AI-powered feature or
 * its maturity rather than a data state.
 *
 * `tone="neutral"` matches the grounded BETA chip exactly. `tone="accent"`
 * extends the same shape onto Atlas's ai-* palette (established by AI
 * Suggestion Card) for marking content itself as AI-generated — e.g. next
 * to an extracted field or suggested value — a real, recurring need not
 * covered by the neutral chip alone.
 */
export interface AILabelProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent';
}

const TONE_CLASSES: Record<NonNullable<AILabelProps['tone']>, string> = {
  neutral: 'bg-canvas text-tertiary',
  accent: 'bg-ai-bg text-ai-accent border border-ai-border',
};

export function AILabel({ tone = 'neutral', className, children, ...props }: AILabelProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded px-1.5 py-0.5',
        'font-sans text-[9.5px] font-semibold uppercase tracking-[0.4px]',
        TONE_CLASSES[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
