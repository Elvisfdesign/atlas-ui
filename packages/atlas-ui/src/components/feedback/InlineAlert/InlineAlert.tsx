import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { TONE_CLASSES, TONE_ICON, type FeedbackTone } from '@/components/feedback/shared/toneStyles';
import { cn } from '@/utils/cn';

export interface InlineAlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: FeedbackTone;
  /** Optional bold lead-in above the description. */
  title?: string;
  children: ReactNode;
}

/**
 * Atlas Inline Alert. A tone-tinted message block for use inside a form,
 * card, or page section — the inline counterpart to Banner, which spans
 * full page width. Shares its tone→color/icon mapping with Banner so the
 * two read as one family.
 */
export const InlineAlert = forwardRef<HTMLDivElement, InlineAlertProps>(
  ({ className, tone = 'info', title, children, ...props }, ref) => {
    const Icon = TONE_ICON[tone];
    const role = tone === 'danger' || tone === 'warning' ? 'alert' : 'status';

    return (
      <div
        ref={ref}
        role={role}
        className={cn('flex items-start gap-2.5 rounded-md px-3.5 py-3', TONE_CLASSES[tone], className)}
        {...props}
      >
        <Icon size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          {title && <p className="font-sans text-[13px] font-medium">{title}</p>}
          <div className="font-sans text-[12.5px] leading-relaxed">{children}</div>
        </div>
      </div>
    );
  }
);

InlineAlert.displayName = 'InlineAlert';
