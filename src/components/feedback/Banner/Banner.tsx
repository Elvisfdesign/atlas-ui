import { type ReactNode } from 'react';
import { X } from 'lucide-react';
import { IconButton } from '@/components/actions/IconButton';
import { TONE_CLASSES, TONE_ICON, type FeedbackTone } from '@/components/feedback/shared/toneStyles';
import { cn } from '@/utils/cn';

export interface BannerProps {
  tone?: FeedbackTone;
  children: ReactNode;
  /** A Button or link rendered at the banner's end. */
  action?: ReactNode;
  /** Shows a dismiss control and fires this when clicked. */
  onDismiss?: () => void;
  className?: string;
}

/**
 * Atlas Banner. A full-width, tone-tinted message bar for page- or
 * section-level notices — the full-width counterpart to Inline Alert.
 */
export function Banner({ tone = 'info', children, action, onDismiss, className }: BannerProps) {
  const Icon = TONE_ICON[tone];
  const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={cn('flex w-full items-center gap-3 px-4 py-3', TONE_CLASSES[tone], className)}
    >
      <Icon size={16} aria-hidden="true" className="shrink-0" />
      <div className="min-w-0 flex-1 font-sans text-[13px] leading-relaxed">{children}</div>
      {action}
      {onDismiss && (
        <IconButton icon={<X />} size="small" aria-label="Dismiss" onClick={onDismiss} className="shrink-0" />
      )}
    </div>
  );
}
