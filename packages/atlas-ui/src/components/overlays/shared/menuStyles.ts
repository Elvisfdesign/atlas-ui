/**
 * Shared floating-panel styling for Dropdown Menu, Context Menu, User
 * Menu, and Command Menu — one surface recipe (elevated surface,
 * default border, medium elevation) so every menu-shaped overlay in
 * Atlas reads as the same family, matching the recipe already
 * established for Line Chart's tooltip and Toast.
 */
export const menuContentClass = [
  'z-dropdown min-w-[180px] overflow-hidden rounded-md border border-border-default bg-surface-elevated p-1',
  'shadow-elevation-medium outline-none',
].join(' ');

export const menuItemClass = [
  'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2.5 py-2',
  'font-sans text-[13px] text-primary outline-none transition-colors',
  'data-[highlighted]:bg-hover-surface',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
].join(' ');

export const menuDestructiveItemClass = 'text-danger-text data-[highlighted]:bg-danger-bg';

export const menuSeparatorClass = 'my-1 h-px bg-border-default';

export const menuLabelClass =
  'px-2.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.3px] text-tertiary';
