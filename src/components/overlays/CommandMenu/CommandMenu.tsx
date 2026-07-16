import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { menuItemClass, menuLabelClass, menuSeparatorClass } from '@/components/overlays/shared/menuStyles';
import { cn } from '@/utils/cn';

export type CommandMenuProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Dialog>;

/**
 * Atlas Command Menu. Source: Atlas Product — every screen's topbar
 * search input shows a "⌘K" chip, which is the real, recurring trigger
 * for exactly this kind of command palette. Built on `cmdk` (the
 * standard companion to Radix for this pattern; it wraps Radix's Dialog
 * internally, so Escape-to-close/focus-trapping/portaling are already
 * handled), styled to match Atlas's other floating panels.
 */
export function CommandMenu({ className, overlayClassName, contentClassName, label = 'Command Menu', ...props }: CommandMenuProps) {
  return (
    <CommandPrimitive.Dialog
      label={label}
      overlayClassName={cn('fixed inset-0 z-overlay bg-overlay-scrim/60', overlayClassName)}
      contentClassName={cn(
        'fixed left-1/2 top-24 z-modal w-full max-w-lg -translate-x-1/2',
        'overflow-hidden rounded-lg border border-border-default bg-surface-elevated shadow-elevation-high outline-none',
        contentClassName
      )}
      className={className}
      {...props}
    />
  );
}

export const CommandMenuInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2.5 border-b border-border-default px-4">
    <Search size={15} aria-hidden="true" className="shrink-0 text-tertiary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'h-12 w-full bg-transparent font-sans text-[13px] text-primary outline-none placeholder:text-tertiary',
        className
      )}
      {...props}
    />
  </div>
));
CommandMenuInput.displayName = 'CommandMenuInput';

export const CommandMenuList = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn('max-h-80 overflow-y-auto p-1', className)} {...props} />
));
CommandMenuList.displayName = 'CommandMenuList';

export const CommandMenuEmpty = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn('px-4 py-8 text-center font-sans text-[12.5px] text-tertiary', className)}
    {...props}
  />
));
CommandMenuEmpty.displayName = 'CommandMenuEmpty';

export type CommandMenuGroupProps = ComponentPropsWithoutRef<typeof CommandPrimitive.Group>;

export const CommandMenuGroup = forwardRef<HTMLDivElement, CommandMenuGroupProps>(
  ({ className, heading, ...props }, ref) => (
    <CommandPrimitive.Group
      ref={ref}
      heading={heading && <span className={menuLabelClass}>{heading}</span>}
      className={cn('[&_[cmdk-group-items]]:flex [&_[cmdk-group-items]]:flex-col [&_[cmdk-group-items]]:gap-0.5', className)}
      {...props}
    />
  )
);
CommandMenuGroup.displayName = 'CommandMenuGroup';

export const CommandMenuItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(menuItemClass, 'data-[selected=true]:bg-hover-surface', className)}
    {...props}
  />
));
CommandMenuItem.displayName = 'CommandMenuItem';

export const CommandMenuSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn(menuSeparatorClass, className)} {...props} />
));
CommandMenuSeparator.displayName = 'CommandMenuSeparator';
