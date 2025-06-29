
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useConnectStore } from "@/hooks/use-connect-store";
import { useNotifications } from "@/hooks/use-notifications";
import { cn } from "@/lib/utils";
import { Bell, Check, UserPlus, Zap, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";

const iconMap = {
    UpcomingEvent: <Zap className="h-5 w-5 text-accent" />,
    FriendRequest: <UserPlus className="h-5 w-5 text-green-500" />,
    PodMention: <MessageSquare className="h-5 w-5 text-blue-500" />,
    System: <Bell className="h-5 w-5 text-primary" />,
};

export default function NotificationsPage() {
    const { notifications, markNotificationAsRead, initNotifications } = useConnectStore();
    const { notifications: allNotifications } = useNotifications();

    // Initialize notifications from stub if not already in store
    useEffect(() => {
        if (allNotifications.length > 0 && notifications.length === 0) {
            initNotifications(allNotifications);
        }
    }, [allNotifications, notifications, initNotifications]);


    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Bell /> Notifications
                </CardTitle>
                <CardDescription>
                    Here are your recent updates, reminders, and social interactions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification.id} className={cn("p-4 flex items-start gap-4 border rounded-lg", !notification.read ? "bg-card" : "bg-secondary/50")}>
                                <div className="mt-1">
                                    {iconMap[notification.type as keyof typeof iconMap] || iconMap.System}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-medium">
                                        {notification.type === 'FriendRequest' || notification.type === 'PodMention' ? (
                                            <>
                                                <span className="font-bold">{notification.from}</span>
                                                {' '}{notification.message}{' '}
                                                {notification.type === 'PodMention' && <span className="font-semibold">{notification.podName}</span>}
                                            </>
                                        ) : (
                                            notification.message
                                        )}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDistanceToNow(new Date(notification.time), { addSuffix: true })}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => markNotificationAsRead(notification.id)}
                                        className="text-muted-foreground hover:text-primary"
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Mark as read
                                    </Button>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-16">
                            <Bell className="mx-auto h-12 w-12 mb-4" />
                            <p className="text-lg font-medium">You're all caught up!</p>
                            <p>New notifications will appear here.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
