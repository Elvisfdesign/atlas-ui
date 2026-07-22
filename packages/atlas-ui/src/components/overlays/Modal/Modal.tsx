import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { IconButton } from '@/components/actions/IconButton';
import { cn } from '@/utils/cn';

/**
 * Atlas Modal. Source: no single dedicated Product frame (a modal is a
 * transient overlay state, not a static mockup) — built on Radix's
 * Dialog primitive, which owns focus trapping, focus return, Escape-to-
 * close, and scroll locking. Styled with the same overlay-scrim and
 * surface-elevated/elevation-high recipe used across Atlas's other
 * overlays.
 */
export const Modal = RadixDialog.Root;
export const ModalTrigger = RadixDialog.Trigger;
export const ModalClose = RadixDialog.Close;

export interface ModalContentProps extends ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  /** Shows the built-in top-right close button. Defaults to true. */
  showCloseButton?: boolean;
}

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, showCloseButton = true, ...props }, ref) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-overlay-scrim/60" />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 z-modal w-full max-w-md -translate-x-1/2 -translate-y-1/2',
          'flex flex-col rounded-lg border border-border-default bg-surface-elevated shadow-elevation-high',
          'outline-none',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close asChild>
            <IconButton
              icon={<X />}
              size="small"
              aria-label="Close"
              className="absolute right-3 top-3"
            />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
);
ModalContent.displayName = 'ModalContent';

export const ModalTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title
      ref={ref}
      className={cn('font-sans text-[15px] font-semibold text-primary', className)}
      {...props}
    />
  )
);
ModalTitle.displayName = 'ModalTitle';

export const ModalDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('font-sans text-[12.5px] leading-relaxed text-secondary', className)}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

export function ModalHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 border-b border-border-default px-6 py-5', className)} {...props} />
  );
}

export function ModalBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-6 py-5', className)} {...props} />;
}

export function ModalFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-2 border-t border-border-default px-6 py-4', className)}
      {...props}
    />
  );
}
