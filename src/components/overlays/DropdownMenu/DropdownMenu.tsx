import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  menuContentClass,
  menuDestructiveItemClass,
  menuItemClass,
  menuLabelClass,
  menuSeparatorClass,
} from '@/components/overlays/shared/menuStyles';
import { cn } from '@/utils/cn';

/**
 * Atlas Dropdown Menu. Source: no single dedicated Product frame — this
 * is the panel Atlas's existing overflow ("more options") affordances
 * (KPI Card's `showMenu`, Icon Button with a `MoreHorizontal` icon) open
 * into. Built on Radix's Dropdown Menu primitive, which owns keyboard
 * navigation (arrow keys, type-ahead, Escape-to-close), focus return to
 * the trigger, and portal + collision-aware positioning.
 */
export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

export type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof RadixDropdownMenu.Content>;

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, sideOffset = 6, align = 'end', ...props }, ref) => (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        className={cn(menuContentClass, className)}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  )
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

export interface DropdownMenuItemProps extends ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item> {
  icon?: ReactNode;
  shortcut?: string;
  destructive?: boolean;
}

export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ className, icon, shortcut, destructive, children, ...props }, ref) => (
    <RadixDropdownMenu.Item
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
    </RadixDropdownMenu.Item>
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Separator ref={ref} className={cn(menuSeparatorClass, className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export const DropdownMenuLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>
>(({ className, ...props }, ref) => (
  <RadixDropdownMenu.Label ref={ref} className={cn(menuLabelClass, className)} {...props} />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';
