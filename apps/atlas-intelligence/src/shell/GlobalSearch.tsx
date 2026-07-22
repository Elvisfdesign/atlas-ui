import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { FileText } from 'lucide-react';
import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
} from 'atlas-ui';
import { primaryNavItems, secondaryNavItems } from '@/nav/navigation';
import { reviewQueue } from '@/mocks/reviewQueue';

export interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** ⌘K / Ctrl+K command palette, wired per CommandMenu.mdx's documented
 * keydown pattern. Search targets are mock data in Phase 1 — nav
 * destinations and Review Queue documents. */
export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const navigate = useNavigate();
  const navItems = useMemo(() => [...primaryNavItems, ...secondaryNavItems], []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  function go(path: string) {
    navigate(path);
    onOpenChange(false);
  }

  return (
    <CommandMenu open={open} onOpenChange={onOpenChange} label="Search commands">
      <CommandMenuInput placeholder="Search anything..." />
      <CommandMenuList>
        <CommandMenuEmpty>No results found.</CommandMenuEmpty>
        <CommandMenuGroup heading="Navigate">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <CommandMenuItem key={item.path} onSelect={() => go(item.path)}>
                <Icon size={14} aria-hidden="true" />
                {item.label}
              </CommandMenuItem>
            );
          })}
        </CommandMenuGroup>
        <CommandMenuGroup heading="Documents">
          {reviewQueue.map((doc) => (
            <CommandMenuItem
              key={doc.id}
              onSelect={() => go(`/review-queue/${encodeURIComponent(doc.id)}`)}
            >
              <FileText size={14} aria-hidden="true" />
              {doc.name}
            </CommandMenuItem>
          ))}
        </CommandMenuGroup>
      </CommandMenuList>
    </CommandMenu>
  );
}
