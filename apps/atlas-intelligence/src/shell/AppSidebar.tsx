import { useNavigate, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarSection,
  SidebarItem,
  Avatar,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  IconButton,
  cn,
} from 'atlas-ui';
import { ChevronDown, ChevronsLeft, ChevronsRight, LogOut, Settings as SettingsIcon, User } from 'lucide-react';
import { primaryNavItems, secondaryNavItems } from '@/nav/navigation';
import { useReviewStore } from '@/store/useReviewStore';
import { currentUser } from '@/mocks/user';
import type { NavItem } from '@/types';

function isActive(pathname: string, path: string): boolean {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export interface AppSidebarProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  /** True inside the mobile Drawer — hides the collapse toggle (it doesn't
   * apply there) and closes the drawer once a nav item is chosen. */
  inDrawer?: boolean;
  onNavigate?: () => void;
}

export function AppSidebar({ collapsed, onCollapsedChange, inDrawer = false, onNavigate }: AppSidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { documents } = useReviewStore();
  const isCollapsed = collapsed && !inDrawer;
  const openReviewCount = documents.filter(
    (doc) => doc.status === 'Review' || doc.status === 'Processing'
  ).length;

  function go(path: string) {
    navigate(path);
    onNavigate?.();
  }

  function renderItem(item: NavItem) {
    const Icon = item.icon;
    const active = isActive(pathname, item.path);
    const count = item.label === 'Review Queue' ? openReviewCount : item.count;

    return (
      <SidebarItem
        key={item.path}
        icon={<Icon size={16} aria-hidden="true" />}
        active={active}
        count={isCollapsed ? undefined : count}
        onClick={() => go(item.path)}
        // Product extension: atlas-ui's SidebarItem has no collapsed/icon-only
        // variant — Sidebar.mdx documents it as fixed-width by design. This
        // narrows the item via className overrides (cn()/tailwind-merge
        // resolves the conflicting utilities) rather than editing atlas-ui.
        className={isCollapsed ? 'justify-center gap-0 px-0' : undefined}
        aria-label={isCollapsed ? item.label : undefined}
        title={isCollapsed ? item.label : undefined}
      >
        {isCollapsed ? '' : item.label}
      </SidebarItem>
    );
  }

  return (
    <Sidebar className={cn('transition-[width] duration-fast', isCollapsed ? 'w-[72px]' : undefined)}>
      <div className={cn('flex items-center gap-2 px-4', isCollapsed && 'justify-center px-0')}>
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-inverse font-sans text-[13px] font-bold text-text-inverse">
          A
        </div>
        {!isCollapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-sans text-[15px] font-bold tracking-wide text-primary">ATLAS</span>
            <span className="font-sans text-[11px] text-tertiary">Intelligence</span>
          </div>
        )}
        {!inDrawer && (
          <IconButton
            icon={isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            size="small"
            className={isCollapsed ? 'absolute right-2 top-6' : 'ml-auto'}
            onClick={() => onCollapsedChange(!collapsed)}
          />
        )}
      </div>

      <SidebarSection className={isCollapsed ? 'px-2' : undefined}>
        {primaryNavItems.map(renderItem)}
      </SidebarSection>

      <SidebarSection withDivider className={isCollapsed ? 'px-2' : undefined}>
        {secondaryNavItems.map(renderItem)}
      </SidebarSection>

      <div className="flex-1" />

      {/* Sidebar profile card: composed from DropdownMenu + Avatar directly
          (rather than the higher-level UserMenu) because Figma's sidebar row
          needs a name/role/chevron trigger — UserMenu's trigger is
          avatar-only by design (see UserMenu.tsx), which is what's used
          instead for the topbar's profile menu. */}
      <div className={cn('px-4', isCollapsed && 'flex justify-center px-2')}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={`Account menu for ${currentUser.name}`}
              className={cn(
                'flex w-full items-center gap-2 rounded-md p-2 outline-none transition-colors hover:bg-hover-surface focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2',
                isCollapsed && 'w-auto justify-center p-0'
              )}
            >
              <Avatar name={currentUser.name} color="inverse" size="small" />
              {!isCollapsed && (
                <>
                  <span className="flex min-w-0 flex-1 flex-col text-left leading-tight">
                    <span className="truncate font-sans text-[13px] font-medium text-primary">
                      {currentUser.name}
                    </span>
                    <span className="truncate font-sans text-[11.5px] text-tertiary">{currentUser.meta}</span>
                  </span>
                  <ChevronDown size={14} aria-hidden="true" className="shrink-0 text-tertiary" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top">
            <DropdownMenuItem icon={<User size={14} />} onSelect={() => go('/settings')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem icon={<SettingsIcon size={14} />} onSelect={() => go('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon={<LogOut size={14} />} destructive onSelect={() => {}}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Sidebar>
  );
}
