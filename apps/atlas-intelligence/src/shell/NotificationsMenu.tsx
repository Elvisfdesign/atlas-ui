import { useState } from 'react';
import { NotificationPanel } from 'atlas-ui';
import { notifications as initialNotifications } from '@/mocks/notifications';

export function NotificationsMenu() {
  const [items, setItems] = useState(initialNotifications);
  const hasUnread = items.some((item) => !item.read);

  function handleItemClick(id: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }

  return <NotificationPanel items={items} hasUnread={hasUnread} onItemClick={handleItemClick} />;
}
