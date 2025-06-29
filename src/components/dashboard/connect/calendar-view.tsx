
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

const eventTypeIcons = {
    Hackathon: <Zap className="h-4 w-4" />,
    Pod: <Users className="h-4 w-4" />,
    Meeting: <Handshake className="h-4 w-4" />,
    Interview: <Briefcase className="h-4 w-4" />,
};

const eventTypeColors = {
    Hackathon: "bg-accent text-accent-foreground",
    Pod: "bg-blue-500 text-white",
    Meeting: "bg-green-500 text-white",
    Interview: "bg-primary text-primary-foreground",
};

export function CalendarView() {
    const { events } = useCalendarEvents();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const eventDates = events.map(event => parseISO(event.date));

    const handleSelectDate = (date: Date | undefined) => {
        if (!date) return;
        
        const eventsOnDay = events.filter(event => isSameDay(parseISO(event.date), date));
        if (eventsOnDay.length > 0) {
            setSelectedDate(date);
            setIsSheetOpen(true);
        } else {
            setSelectedDate(undefined);
            setIsSheetOpen(false);
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
                className="rounded-md border p-0"
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
                              {hasEvent && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
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
                        <SheetDescription>Here's what's scheduled for today.</SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                        {selectedDayEvents.map(event => (
                            <div key={event.id} className="p-3 rounded-lg border flex items-center gap-3">
                                <div className={cn("p-2 rounded-md", eventTypeColors[event.type as keyof typeof eventTypeColors])}>
                                    {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{event.title}</p>
                                    <Badge variant="outline" className="mt-1">{event.type}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
