import { forwardRef, type ComponentPropsWithoutRef, type HTMLAttributes } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { IconButton } from '@/components/actions/IconButton';
import { cn } from '@/utils/cn';

/**
 * Atlas Drawer. Built on Radix's Dialog primitive, same as Modal, but
 * anchored to a screen edge instead of centered — for a side panel that
 * still needs focus trapping and Escape-to-close (a document's full
 * detail view, a multi-field editor) rather than Popover's lighter,
 * non-modal float.
 */
export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

export interface DrawerContentProps extends ComponentPropsWithoutRef<typeof RadixDialog.Content> {
  side?: 'left' | 'right';
  showCloseButton?: boolean;
}

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ className, children, side = 'right', showCloseButton = true, ...props }, ref) => (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-overlay bg-overlay-scrim/60" />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed inset-y-0 z-modal flex w-full max-w-sm flex-col bg-surface-elevated shadow-elevation-high outline-none',
          side === 'right'
            ? 'atlas-drawer-right-transition right-0 border-l border-border-default'
            : 'atlas-drawer-left-transition left-0 border-r border-border-default',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <RadixDialog.Close asChild>
            <IconButton icon={<X />} size="small" aria-label="Close" className="absolute right-3 top-3" />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  )
);
DrawerContent.displayName = 'DrawerContent';

export const DrawerTitle = forwardRef<HTMLHeadingElement, ComponentPropsWithoutRef<typeof RadixDialog.Title>>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Title
      ref={ref}
      className={cn('font-sans text-[15px] font-semibold text-primary', className)}
      {...props}
    />
  )
);
DrawerTitle.displayName = 'DrawerTitle';

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn('font-sans text-[12.5px] leading-relaxed text-secondary', className)}
    {...props}
  />
));
DrawerDescription.displayName = 'DrawerDescription';

export function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 border-b border-border-default px-6 py-5', className)} {...props} />
  );
}

export function DrawerBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 overflow-y-auto px-6 py-5', className)} {...props} />;
}

export function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex items-center justify-end gap-2 border-t border-border-default px-6 py-4', className)}
      {...props}
    />
  );
}
