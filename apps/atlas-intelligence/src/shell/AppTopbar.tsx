import { useState } from 'react';
import { IconButton, SearchInput, TopNav } from 'atlas-ui';
import { Menu } from 'lucide-react';
import { GlobalSearch } from './GlobalSearch';
import { NotificationsMenu } from './NotificationsMenu';
import { ProfileMenu } from './ProfileMenu';

export interface AppTopbarProps {
  /** Shown only on mobile, where the persistent Sidebar is replaced by a Drawer. */
  onMenuClick?: () => void;
}

export function AppTopbar({ onMenuClick }: AppTopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <TopNav>
      <div className="flex min-w-0 items-center gap-3">
        {onMenuClick && (
          <IconButton icon={<Menu />} aria-label="Open navigation" onClick={onMenuClick} />
        )}
        <SearchInput
          readOnly
          shortcut="⌘K"
          className="w-full max-w-xs cursor-pointer"
          onClick={() => setSearchOpen(true)}
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <NotificationsMenu />
        <ProfileMenu />
      </div>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </TopNav>
  );
}
