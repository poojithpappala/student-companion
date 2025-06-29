
"use client";

import { useConnectStore } from "@/hooks/use-connect-store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, UserPlus, Zap, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const iconMap = {
    UpcomingEvent: <Zap className="h-4 w-4 text-accent" />,
    FriendRequest: <UserPlus className="h-4 w-4 text-green-500" />,
    PodMention: <MessageSquare className="h-4 w-4 text-blue-500" />,
    System: <Bell className="h-4 w-4 text-primary" />,
};

export function NotificationsCenter() {
    const { notifications, markNotificationAsRead } = useConnectStore();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <>
            <DropdownMenuLabel className="font-headline">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-96">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <div key={notification.id} className={cn("p-3 flex items-start gap-3", !notification.read && "bg-accent/10")}>
                            <div className="mt-1">
                                {iconMap[notification.type as keyof typeof iconMap] || iconMap.System}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm">
                                    {notification.type === 'FriendRequest' || notification.type === 'PodMention' ? (
                                        <>
                                            <span className="font-semibold">{notification.from}</span>
                                            {' '}{notification.message}{' '}
                                            {notification.type === 'PodMention' && <span className="font-semibold">{notification.podName}</span>}
                                        </>
                                    ) : (
                                        notification.message
                                    )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                                </p>
                            </div>
                            {!notification.read && (
                                <button
                                    onClick={() => markNotificationAsRead(notification.id)}
                                    title="Mark as read"
                                    className="mt-1 h-2 w-2 rounded-full bg-accent ring-4 ring-accent/30"
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground p-8">
                        <Bell className="mx-auto h-8 w-8 mb-2" />
                        <p>No new notifications</p>
                    </div>
                )}
            </ScrollArea>
            <DropdownMenuSeparator />
            <div className="p-2">
                <Button variant="ghost" className="w-full">View all notifications</Button>
            </div>
        </>
    );
}
