import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { IconButton } from '@/components/actions/IconButton';
import { TONE_ICON, TONE_TEXT, type FeedbackTone } from '@/components/feedback/shared/toneStyles';
import { cn } from '@/utils/cn';

/** Wrap your app (or the part of it that shows toasts) in this once. */
export const ToastProvider = RadixToast.Provider;

export interface ToastViewportProps {
  className?: string;
}

/** The fixed stack toasts render into. Render once per app. */
export function ToastViewport({ className }: ToastViewportProps) {
  return (
    <RadixToast.Viewport
      className={cn(
        'fixed bottom-4 right-4 z-toast flex w-full max-w-sm flex-col gap-2 outline-none',
        className
      )}
    />
  );
}

export interface ToastProps extends Omit<ComponentPropsWithoutRef<typeof RadixToast.Root>, 'title'> {
  tone?: FeedbackTone;
  title: string;
  description?: string;
}

/**
 * Atlas Toast. Source: no dedicated Product frame (toasts are transient
 * by nature and don't sit in a static mockup) — built on Radix's Toast
 * primitive, which owns swipe-to-dismiss, auto-dismiss timing, and
 * pause-on-hover/focus, and styled with the same surface-elevated +
 * elevation-high recipe used for Line Chart's tooltip. Shares its tone
 * icon with Inline Alert and Banner.
 */
export const Toast = forwardRef<HTMLLIElement, ToastProps>(
  ({ className, tone = 'info', title, description, ...props }, ref) => {
    const Icon = TONE_ICON[tone];

    return (
      <RadixToast.Root
        ref={ref}
        className={cn(
          'flex items-start gap-2.5 rounded-md border border-border-default bg-surface-elevated p-3.5',
          'shadow-elevation-high transition-all duration-normal ease-out-atlas',
          'data-[state=closed]:opacity-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
          className
        )}
        {...props}
      >
        <Icon size={16} aria-hidden="true" className={cn('mt-0.5 shrink-0', TONE_TEXT[tone])} />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <RadixToast.Title className="font-sans text-[13px] font-medium text-primary">
            {title}
          </RadixToast.Title>
          {description && (
            <RadixToast.Description className="font-sans text-[12.5px] text-secondary">
              {description}
            </RadixToast.Description>
          )}
        </div>
        <RadixToast.Close asChild>
          <IconButton icon={<X />} size="small" aria-label="Dismiss notification" />
        </RadixToast.Close>
      </RadixToast.Root>
    );
  }
);

Toast.displayName = 'Toast';
