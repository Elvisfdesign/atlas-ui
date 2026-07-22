import { useState, type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { AILabel } from '@/components/ai/AILabel';
import { PromptInput } from '@/components/ai/PromptInput';
import { SuggestedPrompt } from '@/components/ai/SuggestedPrompt';
import { cn } from '@/utils/cn';

export interface AssistantMessage {
  id: string;
  role: 'assistant' | 'user';
  content: ReactNode;
}

export interface AssistantPanelProps {
  title?: string;
  /** Set to `null` to hide the tag entirely. */
  badge?: string | null;
  messages: AssistantMessage[];
  suggestedPrompts?: string[];
  onSuggestedPromptClick?: (prompt: string) => void;
  onSubmit?: (value: string) => void;
  disclaimer?: string | null;
  className?: string;
}

/**
 * Atlas Assistant Panel.
 * Source: Atlas Product — Document Review's `ai-col`: the AI Assistant
 * sidebar (a header with a BETA tag, an intro message bubble, a set of
 * suggested-prompt chips, a composer, and a disclaimer). Composes AI
 * Label, Suggested Prompt, and Prompt Input rather than reimplementing
 * any of them.
 */
export function AssistantPanel({
  title = 'AI Assistant',
  badge = 'BETA',
  messages,
  suggestedPrompts,
  onSuggestedPromptClick,
  onSubmit,
  disclaimer = 'AI responses may be inaccurate.',
  className,
}: AssistantPanelProps) {
  // Owns the composer's value so it can clear itself on submit — Prompt
  // Input intentionally leaves that to the caller (see its own docs), and
  // Assistant Panel is that caller for every consumer, so it's the right
  // place to make "send" feel complete rather than pushing this onto every
  // screen that uses Assistant Panel.
  const [draft, setDraft] = useState('');

  return (
    <div
      className={cn(
        'flex h-full flex-col gap-4 rounded-xl border border-border-default bg-surface p-5',
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2">
        <h3 className="font-sans text-[14.5px] font-semibold text-primary">{title}</h3>
        {badge && <AILabel>{badge}</AILabel>}
      </div>
      <div
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-label="Conversation"
        className="flex flex-1 flex-col gap-3.5 overflow-y-auto"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn('flex gap-2.5', message.role === 'user' && 'flex-row-reverse')}
          >
            {message.role === 'assistant' && (
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-interactive-primary text-surface">
                <Sparkles aria-hidden="true" size={13} />
              </span>
            )}
            <div
              className={cn(
                'max-w-[221px] rounded-[10px] p-2.5 font-sans text-[12.5px] leading-[18px]',
                message.role === 'assistant'
                  ? 'bg-surface-subtle text-secondary'
                  : 'bg-interactive-primary text-surface'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        {suggestedPrompts && suggestedPrompts.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {suggestedPrompts.map((prompt) => (
              <SuggestedPrompt key={prompt} onClick={() => onSuggestedPromptClick?.(prompt)}>
                {prompt}
              </SuggestedPrompt>
            ))}
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col gap-2">
        <PromptInput
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onSubmit={(value) => {
            onSubmit?.(value);
            setDraft('');
          }}
        />
        {disclaimer && <p className="font-sans text-[10px] text-disabled">{disclaimer}</p>}
      </div>
    </div>
  );
}
