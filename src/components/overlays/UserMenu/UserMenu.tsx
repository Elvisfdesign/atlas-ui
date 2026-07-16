import type { ReactNode } from 'react';
import { Avatar, type AvatarProps } from '@/components/data-display/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/overlays/DropdownMenu';

export interface UserMenuProps {
  name: string;
  /** Secondary line under the name — role, email, or both. */
  meta?: string;
  avatarSrc?: string;
  avatarColor?: AvatarProps['color'];
  align?: 'start' | 'end';
  /** DropdownMenuItem/DropdownMenuSeparator elements (Profile, Settings, Log out, etc.). */
  children: ReactNode;
}

/**
 * Atlas User Menu. Source: Atlas Product's sidebar profile card and
 * topbar avatar chip (both a 32–34px Avatar + name + role), composed
 * here with Dropdown Menu rather than reimplementing the menu panel.
 */
export function UserMenu({ name, meta, avatarSrc, avatarColor, align = 'end', children }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Account menu for ${name}`}
          className="flex items-center gap-2 rounded-md p-1 outline-none transition-colors hover:bg-hover-surface focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2"
        >
          <Avatar name={name} src={avatarSrc} color={avatarColor} size="small" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <div className="flex flex-col gap-0.5 px-2.5 py-2">
          <span className="truncate font-sans text-[13px] font-medium text-primary">{name}</span>
          {meta && <span className="truncate font-sans text-[12px] text-tertiary">{meta}</span>}
        </div>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
