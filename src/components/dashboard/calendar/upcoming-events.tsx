
"use client";

import { useCalendarEvents } from '@/hooks/use-calendar-events';
import { isFuture, parseISO, format } from 'date-fns';
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Briefcase, Handshake } from "lucide-react";
import { cn } from '@/lib/utils';
import React from 'react';

const eventTypeDetails: Record<string, { icon: React.ReactNode; className: string }> = {
    Hackathon: { icon: <Zap className="h-4 w-4" />, className: "bg-accent text-accent-foreground hover:bg-accent/90 border-transparent" },
    Pod: { icon: <Users className="h-4 w-4" />, className: "bg-[hsl(var(--chart-2))] text-primary-foreground hover:bg-[hsl(var(--chart-2))]/90 border-transparent" }, 
    Meeting: { icon: <Handshake className="h-4 w-4" />, className: "bg-[hsl(var(--chart-3))] text-primary-foreground hover:bg-[hsl(var(--chart-3))]/90 border-transparent" }, 
    Interview: { icon: <Briefcase className="h-4 w-4" />, className: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent" },
};

export function UpcomingEvents() {
    const { events } = useCalendarEvents();
    
    const upcomingEvents = events
        .filter(event => isFuture(parseISO(event.date)))
        .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
        .slice(0, 7);

    if (upcomingEvents.length === 0) {
        return <p className="text-muted-foreground text-sm text-center py-4">No upcoming events.</p>;
    }

    return (
        <div className="space-y-4">
            {upcomingEvents.map(event => {
                const details = eventTypeDetails[event.type] || { icon: null, className: "bg-secondary text-secondary-foreground" };
                return (
                 <div key={event.id} className="flex items-center gap-4">
                    <div className="flex flex-col shrink-0 items-center justify-center p-2 border rounded-md w-16 bg-background">
                        <span className="font-bold text-lg text-primary">{format(parseISO(event.date), 'dd')}</span>
                        <span className="text-xs text-muted-foreground">{format(parseISO(event.date), 'MMM')}</span>
                    </div>
                    <div className="flex-grow">
                        <p className="font-semibold text-sm">{event.title}</p>
                        <Badge className={cn("mt-1", details.className)}>
                            {details.icon && <span className="mr-1.5">{details.icon}</span>}
                            {event.type}
                        </Badge>
                    </div>
                </div>
                )
            })}
        </div>
    );
}
