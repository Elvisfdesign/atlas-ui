import { Sparkles } from 'lucide-react';
import { Button } from '@/components/actions/Button';
import { cn } from '@/utils/cn';

/**
 * Atlas AI Suggestion Card.
 * Source: Atlas Product — Document Review's `suggest-card`: an ai-tinted
 * card (the same ai-bg/ai-border recipe used across the AI components)
 * with a "Payment terms detected..." description, the suggested value,
 * a confidence line, and Accept/Reject actions. Composes Button for both
 * actions rather than reimplementing button styling.
 */
export interface AISuggestionCardProps {
  title?: string;
  description: string;
  suggestedValue: string;
  /** 0–100. */
  confidence: number;
  onAccept?: () => void;
  onReject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  className?: string;
}

export function AISuggestionCard({
  title = 'AI Suggestion',
  description,
  suggestedValue,
  confidence,
  onAccept,
  onReject,
  acceptLabel = 'Accept',
  rejectLabel = 'Reject',
  className,
}: AISuggestionCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2.5 rounded-xl border border-ai-border bg-ai-bg p-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Sparkles aria-hidden="true" size={14} className="text-ai-accent" />
        <span className="font-sans text-[12.5px] font-semibold text-primary">{title}</span>
      </div>
      <p className="font-sans text-xs text-secondary">{description}</p>
      <p className="font-sans text-sm font-semibold text-primary">{suggestedValue}</p>
      <p className="font-sans text-[11px] text-tertiary">{Math.round(confidence)}% confidence</p>
      <div className="flex gap-2">
        <Button variant="primary" size="small" onClick={onAccept} className="flex-1">
          {acceptLabel}
        </Button>
        <Button variant="secondary" size="small" onClick={onReject} className="flex-1 text-secondary">
          {rejectLabel}
        </Button>
      </div>
    </div>
  );
}
