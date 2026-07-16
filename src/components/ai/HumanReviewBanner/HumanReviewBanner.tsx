import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/actions/Button';
import { cn } from '@/utils/cn';

/**
 * Atlas Human Review Banner.
 * Not a direct 1:1 Figma frame — synthesized from a real, recurring signal:
 * both Review Queue and Document Review mark documents with a "Review"
 * status (warning-toned Badge) whenever the AI's extraction needs a human
 * to confirm it. Human Review Banner gives that same underlying event a
 * page-level surface — an explanatory banner rather than just a table
 * badge — using the ai-bg/ai-border/ai-accent palette established by AI
 * Suggestion Card, since the message is specifically attributed to the
 * AI's own assessment ("I'm not confident enough here") rather than a
 * generic system warning.
 */
export interface HumanReviewBannerProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function HumanReviewBanner({
  message,
  actionLabel,
  onAction,
  className,
}: HumanReviewBannerProps) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-center gap-3 rounded-lg border border-ai-border bg-ai-bg px-4 py-3',
        className
      )}
    >
      <AlertTriangle aria-hidden="true" size={16} className="shrink-0 text-ai-accent" />
      <p className="flex-1 font-sans text-[13px] text-primary">{message}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="small" onClick={onAction} className="shrink-0">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
