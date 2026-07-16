import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as RadixContextMenu from '@radix-ui/react-context-menu';
import {
  menuContentClass,
  menuDestructiveItemClass,
  menuItemClass,
  menuLabelClass,
  menuSeparatorClass,
} from '@/components/overlays/shared/menuStyles';
import { cn } from '@/utils/cn';

/**
 * Atlas Context Menu. Same panel recipe as Dropdown Menu (shares the
 * menu styling helpers), triggered by right-click instead of a click on
 * a visible trigger element. Built on Radix's Context Menu primitive.
 */
export const ContextMenu = RadixContextMenu.Root;
/** Wrap the right-clickable area in this. */
export const ContextMenuTrigger = RadixContextMenu.Trigger;

export type ContextMenuContentProps = ComponentPropsWithoutRef<typeof RadixContextMenu.Content>;

export const ContextMenuContent = forwardRef<HTMLDivElement, ContextMenuContentProps>(
  ({ className, ...props }, ref) => (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content ref={ref} className={cn(menuContentClass, className)} {...props} />
    </RadixContextMenu.Portal>
  )
);
ContextMenuContent.displayName = 'ContextMenuContent';

export interface ContextMenuItemProps extends ComponentPropsWithoutRef<typeof RadixContextMenu.Item> {
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
}

export const ContextMenuItem = forwardRef<HTMLDivElement, ContextMenuItemProps>(
  ({ className, icon, shortcut, destructive, children, ...props }, ref) => (
    <RadixContextMenu.Item
      ref={ref}
      className={cn(menuItemClass, destructive && menuDestructiveItemClass, className)}
      {...props}
    >
      {icon && (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {shortcut && <span className="shrink-0 font-sans text-[11.5px] text-tertiary">{shortcut}</span>}
    </RadixContextMenu.Item>
  )
);
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Separator>
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Separator ref={ref} className={cn(menuSeparatorClass, className)} {...props} />
));
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

export const ContextMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixContextMenu.Label>
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Label ref={ref} className={cn(menuLabelClass, className)} {...props} />
));
ContextMenuLabel.displayName = 'ContextMenuLabel';
