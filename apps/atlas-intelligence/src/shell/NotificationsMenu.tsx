import { NotificationPanel } from 'atlas-ui';
import { useReviewStore } from '@/store/useReviewStore';

export function NotificationsMenu() {
  const { notifications, markNotificationRead } = useReviewStore();
  const hasUnread = notifications.some((item) => !item.read);

  return <NotificationPanel items={notifications} hasUnread={hasUnread} onItemClick={markNotificationRead} />;
}
