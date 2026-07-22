import { forwardRef, useRef, type FormEvent, type InputHTMLAttributes } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Atlas Prompt Input.
 * Source: Atlas Product — the AI Assistant panel's `ai-input` (Document
 * Review): a single-line field with a trailing circular send button.
 * Submits on Enter or send-button click, same as a typical chat composer.
 */
export interface PromptInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'size'> {
  /** Called with the trimmed value on submit. The field is not cleared automatically — control `value` if you want that. */
  onSubmit?: (value: string) => void;
  className?: string;
}

export const PromptInput = forwardRef<HTMLInputElement, PromptInputProps>(
  (
    { className, placeholder = 'Ask anything about this document...', onSubmit, disabled, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const value = innerRef.current?.value.trim();
      if (value) onSubmit?.(value);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex items-center gap-2 rounded-lg border border-border-default py-2.5 pl-3.5 pr-2',
          'has-[input:focus-visible]:border-border-focus has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-border-focus/20',
          className
        )}
      >
        <input
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent font-sans text-xs text-primary outline-none placeholder:text-tertiary disabled:cursor-not-allowed"
          {...props}
        />
        <button
          type="submit"
          aria-label="Send"
          disabled={disabled}
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-md transition-colors',
            'bg-interactive-primary text-surface',
            'hover:bg-interactive-primary-hover active:bg-interactive-primary-pressed',
            'disabled:pointer-events-none disabled:opacity-40'
          )}
        >
          <ArrowUp aria-hidden="true" size={13} />
        </button>
      </form>
    );
  }
);

PromptInput.displayName = 'PromptInput';
