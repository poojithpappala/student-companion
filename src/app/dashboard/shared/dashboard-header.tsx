
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Flame,
  Gem,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";
import { NotificationsCenter } from "@/components/dashboard/connect/notifications-center";
import { useConnectStore } from "@/hooks/use-connect-store";
import { useNotifications } from "@/hooks/use-notifications";
import { useEffect } from "react";

const getBreadcrumb = (pathname: string) => {
    const parts = pathname.split('/').filter(part => part);
    if(parts.length < 2) return "Dashboard";

    const lastPart = parts[parts.length - 1].split('?')[0]; // Remove query params
    return lastPart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function DashboardHeader() {
  const pathname = usePathname();
  const { notifications, initNotifications } = useConnectStore();
  const { notifications: allNotifications } = useNotifications();

  useEffect(() => {
    if (allNotifications.length > 0) {
        initNotifications(allNotifications);
    }
  }, [allNotifications, initNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>

      <div className="flex-1">
        <h1 className="font-headline text-xl font-semibold text-primary">{getBreadcrumb(pathname)}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 text-sm font-semibold">
          <Flame className="h-5 w-5 text-accent" />
          <span className="text-foreground">7 days</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm font-semibold">
          <Gem className="h-5 w-5 text-primary" />
          <span className="text-foreground">1,200 pts</span>
        </div>

        <ModeToggle />
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                            {unreadCount}
                        </span>
                    )}
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <NotificationsCenter />
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1080&auto=format&fit=crop"} alt="User avatar" data-ai-hint="person profile" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Guest User</span>
              <ChevronDown className="h-4 w-4 hidden sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
