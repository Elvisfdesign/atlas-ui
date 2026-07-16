import type { ReactNode } from 'react';
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
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto">
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
        <PromptInput onSubmit={onSubmit} />
        {disclaimer && <p className="font-sans text-[10px] text-disabled">{disclaimer}</p>}
      </div>
    </div>
  );
}
