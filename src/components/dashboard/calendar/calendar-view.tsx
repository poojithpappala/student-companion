
"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useCalendarEvents } from "@/hooks/use-calendar-events";
import { isSameDay, parseISO } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Zap, Users, Briefcase, Handshake } from "lucide-react";
import { cn } from '@/lib/utils';
import React from 'react';

const eventTypeDetails: Record<string, { icon: React.ReactNode; className: string }> = {
    Hackathon: { icon: <Zap className="h-5 w-5" />, className: "bg-accent text-accent-foreground hover:bg-accent/90 border-transparent" },
    Pod: { icon: <Users className="h-5 w-5" />, className: "bg-[hsl(var(--chart-2))] text-primary-foreground hover:bg-[hsl(var(--chart-2))]/90 border-transparent" }, 
    Meeting: { icon: <Handshake className="h-5 w-5" />, className: "bg-[hsl(var(--chart-3))] text-primary-foreground hover:bg-[hsl(var(--chart-3))]/90 border-transparent" }, 
    Interview: { icon: <Briefcase className="h-5 w-5" />, className: "bg-primary text-primary-foreground hover:bg-primary/90 border-transparent" },
};


export function CalendarView() {
    const { events } = useCalendarEvents();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const eventDates = events.map(event => parseISO(event.date));

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        
        const eventsOnDay = events.filter(event => isSameDay(parseISO(event.date), date));
        setSelectedDate(date);
        if (eventsOnDay.length > 0) {
            setIsSheetOpen(true);
        }
    };
    
    const selectedDayEvents = selectedDate
        ? events.filter(event => isSameDay(parseISO(event.date), selectedDate))
        : [];

    return (
        <>
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                className="w-full"
                modifiers={{
                    hasEvent: (date) => eventDates.some(eventDate => isSameDay(eventDate, date)),
                }}
                modifiersClassNames={{
                    hasEvent: 'relative !bg-accent/20',
                }}
                components={{
                  DayContent: (props) => {
                      const hasEvent = eventDates.some(eventDate => isSameDay(eventDate, props.date));
                      return (
                          <div className="relative w-full h-full flex items-center justify-center">
                              {props.date.getDate()}
                              {hasEvent && <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-accent" />}
                          </div>
                      );
                  },
                }}
            />
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="font-headline flex items-center gap-2">
                            <CalendarIcon />
                             Events for {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </SheetTitle>
                        <SheetDescription>Here's what's scheduled for this day.</SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                        {selectedDayEvents.length > 0 ? selectedDayEvents.map(event => {
                            const details = eventTypeDetails[event.type] || { icon: <CalendarIcon className="h-5 w-5" />, className: "bg-secondary text-secondary-foreground" };
                            return (
                            <div key={event.id} className="p-3 rounded-lg border flex items-center gap-3">
                                <div className={cn("p-2 rounded-md", details.className.replace(/hover:bg-accent\/90|hover:bg-primary\/90|hover:bg-\[hsl\(var\(--chart-.\)\)\]\/90/g, ''))}>
                                    {details.icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{event.title}</p>
                                    <Badge className={cn("mt-1", details.className)}>
                                        {event.type}
                                    </Badge>
                                </div>
                            </div>
                            )
                        }) : (
                            <p className="text-muted-foreground text-center pt-4">No events scheduled for this day.</p>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
