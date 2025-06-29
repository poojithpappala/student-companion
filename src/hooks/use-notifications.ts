
import notificationsData from '@/lib/stubs/notifications.json';

export type Notification = (typeof notificationsData)[0];

export function useNotifications() {
    // In a real app, this would be an async fetch.
    const notifications: Notification[] = notificationsData;

    return { notifications };
}
