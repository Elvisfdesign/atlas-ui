import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/**
 * Atlas Suggested Prompt.
 * Source: Atlas Product — the AI Assistant panel's `prompt-chip` rows
 * (Document Review): full-width, left-aligned suggestion buttons a user
 * clicks to send that text as their prompt.
 */
export interface SuggestedPromptProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: string;
}

export const SuggestedPrompt = forwardRef<HTMLButtonElement, SuggestedPromptProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'w-full rounded-lg border border-border-default px-3 py-[9px] text-left',
        'font-sans text-xs text-secondary transition-colors',
        'hover:border-border-strong hover:bg-hover-surface',
        'focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

SuggestedPrompt.displayName = 'SuggestedPrompt';
