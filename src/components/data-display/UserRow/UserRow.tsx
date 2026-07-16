import type { ReactNode } from 'react';
import { Avatar } from '@/components/data-display/Avatar';
import { cn } from '@/utils/cn';

/**
 * Atlas User Row.
 * Source: Atlas Product — the Review Queue table's assignee cell (a
 * 24px Avatar + the person's name). Composes Avatar directly rather than
 * reimplementing the photo/initials/fallback logic.
 */
export interface UserRowProps {
  name: string;
  avatarSrc?: string;
  /** Secondary line under the name (e.g. a role, a relative timestamp). */
  meta?: ReactNode;
  size?: 'small' | 'medium';
  className?: string;
}

export function UserRow({ name, avatarSrc, meta, size = 'small', className }: UserRowProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar name={name} src={avatarSrc} size={size} />
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-sans text-[13px] text-primary">{name}</span>
        {meta && <span className="truncate font-sans text-[12px] text-tertiary">{meta}</span>}
      </div>
    </div>
  );
}
