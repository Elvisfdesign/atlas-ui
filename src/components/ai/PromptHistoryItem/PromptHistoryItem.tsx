import { MessageSquare } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas Prompt History Item.
 * Not a direct 1:1 Figma frame — Document Review's doc-tabs include a
 * "History" tab, but its expanded content wasn't part of the captured
 * screen state. Synthesized from Atlas's established list-item recipe
 * (File Row / Notification Panel's item button: icon + text stack +
 * trailing meta, a real `<button>` for keyboard/AT reachability) applied
 * to a past prompt-and-response pair, the real content that tab implies.
 */
export interface PromptHistoryItemProps {
  prompt: string;
  response?: string;
  time: string;
  onClick?: () => void;
  className?: string;
}

export function PromptHistoryItem({
  prompt,
  response,
  time,
  onClick,
  className,
}: PromptHistoryItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-start gap-2.5 py-3 text-left transition-colors hover:bg-hover-surface',
        className
      )}
    >
      <MessageSquare aria-hidden="true" size={14} className="mt-0.5 shrink-0 text-tertiary" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-[13px] font-medium text-primary">{prompt}</p>
        {response && (
          <p className="mt-0.5 line-clamp-2 font-sans text-[12.5px] text-secondary">{response}</p>
        )}
      </div>
      <span className="shrink-0 font-sans text-[12px] text-tertiary">{time}</span>
    </button>
  );
}
