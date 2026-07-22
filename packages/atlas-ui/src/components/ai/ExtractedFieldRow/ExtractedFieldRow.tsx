import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Pencil } from 'lucide-react';
import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { cn } from '@/utils/cn';

/**
 * Atlas Extracted Field Row.
 * Source: Atlas Product — Document Review's Extracted Fields card
 * (`field-row`): a label + value stack on the left, a Confidence Badge on
 * the right. Composes Confidence Badge rather than reimplementing the
 * percentage-and-chip treatment.
 */
export interface ExtractedFieldRowProps {
  label: string;
  value: string;
  /** 0–100. */
  confidence: number;
  className?: string;
  /**
   * Shows a Pencil affordance that turns the value into an inline text
   * field. A reviewer correcting a low-confidence AI extraction is the
   * primary use case — the row itself never decides what happens on save,
   * it just reports the new value via `onSave`.
   */
  editable?: boolean;
  /** Called with the trimmed new value when an edit is confirmed (Enter, the save button, or blur). Required when `editable` is true. */
  onSave?: (value: string) => void;
}

const SAVE_FLASH_MS = 1200;

export function ExtractedFieldRow({
  label,
  value,
  confidence,
  className,
  editable = false,
  onSave,
}: ExtractedFieldRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [justSaved, setJustSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    if (!justSaved) return;
    const timer = window.setTimeout(() => setJustSaved(false), SAVE_FLASH_MS);
    return () => window.clearTimeout(timer);
  }, [justSaved]);

  function startEditing() {
    setDraft(value);
    setIsEditing(true);
  }

  function commit() {
    const trimmed = draft.trim();
    setIsEditing(false);
    if (trimmed && trimmed !== value) {
      onSave?.(trimmed);
      setJustSaved(true);
    }
  }

  function cancel() {
    setDraft(value);
    setIsEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  }

  if (isEditing) {
    return (
      <div className={cn('flex items-center gap-2 py-2.5', className)}>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label htmlFor={inputId} className="truncate font-sans text-[11px] text-tertiary">
            {label}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commit}
            className="min-w-0 rounded-sm border border-border-focus bg-surface px-1.5 py-0.5 font-sans text-[13px] font-medium text-primary outline-none ring-2 ring-border-focus/20"
          />
        </div>
        <ConfidenceBadge value={confidence} className="shrink-0" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-sm py-2.5 px-1 -mx-1',
        justSaved && 'atlas-save-flash',
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate font-sans text-[11px] text-tertiary">{label}</span>
        <span className="truncate font-sans text-[13px] font-medium text-primary">{value}</span>
      </div>
      <ConfidenceBadge value={confidence} className="shrink-0" />
      {justSaved && (
        <span role="status" className="sr-only">
          {label} updated to {value}
        </span>
      )}
      {editable && (
        <button
          type="button"
          onClick={startEditing}
          aria-label={`Edit ${label}`}
          className={cn(
            'shrink-0 rounded-sm p-1 text-tertiary opacity-0 transition-opacity',
            'hover:bg-hover-surface hover:text-primary',
            'focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
            'group-hover:opacity-100'
          )}
        >
          <Pencil size={12} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
