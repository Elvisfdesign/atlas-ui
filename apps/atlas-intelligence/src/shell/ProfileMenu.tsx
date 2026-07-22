import { useNavigate } from 'react-router';
import { UserMenu, DropdownMenuItem, DropdownMenuSeparator } from 'atlas-ui';
import { LogOut, Settings as SettingsIcon, User } from 'lucide-react';

const CURRENT_USER = { name: 'Elvis Meraz', meta: 'Admin' };

/** Topbar avatar-chip profile menu — matches Atlas Product's topbar user
 * chip exactly, so it uses `UserMenu` as-is (avatar-only trigger). The
 * richer sidebar profile row is composed separately in `AppSidebar`. */
export function ProfileMenu() {
  const navigate = useNavigate();

  return (
    <UserMenu name={CURRENT_USER.name} meta={CURRENT_USER.meta}>
      <DropdownMenuItem icon={<User size={14} />} onSelect={() => navigate('/settings')}>
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem icon={<SettingsIcon size={14} />} onSelect={() => navigate('/settings')}>
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem icon={<LogOut size={14} />} destructive onSelect={() => {}}>
        Log out
      </DropdownMenuItem>
    </UserMenu>
  );
}
