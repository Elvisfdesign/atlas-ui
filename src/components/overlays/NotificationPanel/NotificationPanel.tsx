import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/overlays/Popover';
import { cn } from '@/utils/cn';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  read?: boolean;
}

export interface NotificationPanelProps {
  items: NotificationItem[];
  /** Shows the small unread dot on the bell trigger. */
  hasUnread?: boolean;
  onItemClick?: (id: string) => void;
  emptyMessage?: string;
}

/**
 * Atlas Notification Panel. Source: Atlas Product's topbar right-cluster
 * — a 36px bell-icon chip with a small corner dot indicating unread
 * notifications, present on every screen. Composes Popover for the
 * panel rather than a custom floating-element implementation.
 */
export function NotificationPanel({
  items,
  hasUnread = false,
  onItemClick,
  emptyMessage = 'No notifications yet.',
}: NotificationPanelProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={hasUnread ? 'Notifications (unread)' : 'Notifications'}
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-primary transition-colors hover:bg-hover-surface focus-visible:outline-2 focus-visible:outline-border-focus focus-visible:outline-offset-2"
        >
          <Bell size={17} aria-hidden="true" />
          {hasUnread && (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-interactive-danger"
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="border-b border-border-default px-4 py-3">
          <h3 className="font-sans text-[13px] font-medium text-primary">Notifications</h3>
        </div>
        {items.length === 0 ? (
          <p className="px-4 py-8 text-center font-sans text-[12.5px] text-tertiary">{emptyMessage}</p>
        ) : (
          <div className="flex max-h-80 flex-col overflow-y-auto">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onItemClick?.(item.id)}
                className={cn(
                  'flex flex-col gap-0.5 border-b border-border-default px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-hover-surface',
                  !item.read && 'bg-interactive-selected'
                )}
              >
                <span className="font-sans text-[13px] font-medium text-primary">{item.title}</span>
                {item.description && (
                  <span className="font-sans text-[12.5px] text-secondary">{item.description}</span>
                )}
                <span className="font-sans text-[11.5px] text-tertiary">{item.time}</span>
              </button>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
