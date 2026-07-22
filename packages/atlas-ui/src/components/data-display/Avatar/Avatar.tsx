import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

/**
 * Atlas Avatar.
 * Source: Atlas Product — the topbar user chip (34px, `background-inverse` /
 * `text-inverse`) and the assignee chips used in list/table rows (24px,
 * cycling `avatar-bg-1/2/3` with `text-on-avatar`). Not yet a componentized
 * Figma node (see Atlas UI System, 16 — Handoff Audit, React Readiness) —
 * this implementation is built directly from the two real Product patterns.
 */
export const avatarVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-full font-sans font-semibold overflow-hidden select-none',
  {
    variants: {
      size: {
        small: 'h-6 w-6 text-[9px]', // 24px, matches Product assignee chips
        medium: 'h-[34px] w-[34px] text-xs', // 34px, matches Product topbar chip
      },
      color: {
        1: 'bg-avatar-1 text-on-avatar',
        2: 'bg-avatar-2 text-on-avatar',
        3: 'bg-avatar-3 text-on-avatar',
        inverse: 'bg-inverse text-text-inverse',
      },
    },
    defaultVariants: { size: 'medium', color: 'inverse' },
  }
);

type AvatarColor = 1 | 2 | 3 | 'inverse';
const CYCLE_COLORS: readonly (1 | 2 | 3)[] = [1, 2, 3];

/** Deterministically picks one of the 3 accent colors from a name/initials string, so the same person always renders the same color. */
function hashToColor(seed: string): 1 | 2 | 3 {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return CYCLE_COLORS[hash % CYCLE_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export interface AvatarProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'>, VariantProps<typeof avatarVariants> {
  /** Full name — used to derive initials (when `initials` isn't given) and to auto-pick a stable color (when `color` isn't given). */
  name: string;
  /** Overrides the initials derived from `name` (e.g. for 3+-letter identifiers). */
  initials?: string;
  /** Photo URL. Falls back to initials automatically if it fails to load. */
  src?: string;
  /**
   * `1 | 2 | 3` — one of the Atlas accent colors, cycled automatically from
   * `name` when omitted. `'inverse'` — the monochrome treatment Atlas uses
   * for the current signed-in user in the app chrome.
   */
  color?: AvatarColor;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, color, name, initials, src, ...props }, ref) => {
    const [imgFailed, setImgFailed] = useState(false);
    const resolvedColor = color ?? hashToColor(name);
    const resolvedInitials = initials ?? getInitials(name);

    return (
      <span
        ref={ref}
        role="img"
        aria-label={name}
        className={cn(avatarVariants({ size, color: resolvedColor }), className)}
        {...props}
      >
        {src && !imgFailed ? (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{resolvedInitials}</span>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';
