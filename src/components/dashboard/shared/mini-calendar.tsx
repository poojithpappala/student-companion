
"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useCalendarEvents } from "@/hooks/use-calendar-events";
import { isSameDay, parseISO, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Zap, Users, Briefcase, Handshake } from "lucide-react";

const eventTypeIcons = {
    Hackathon: <Zap className="h-4 w-4" />,
    Pod: <Users className="h-4 w-4" />,
    Meeting: <Handshake className="h-4 w-4" />,
    Interview: <Briefcase className="h-4 w-4" />,
};

const eventTypeColors = {
    Hackathon: "bg-accent/20 text-accent",
    Pod: "bg-blue-500/20 text-blue-500",
    Meeting: "bg-green-500/20 text-green-500",
    Interview: "bg-primary/20 text-primary",
};

export function MiniCalendar() {
    const { events } = useCalendarEvents();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const eventDates = events.map(event => parseISO(event.date));

    const DayContent: React.FC<{ date: Date }> = ({ date }) => {
        const hasEvent = eventDates.some(eventDate => isSameDay(eventDate, date));
        const dayEvents = hasEvent ? events.filter(e => isSameDay(parseISO(e.date), date)) : [];
        
        const DayComponent = (
            <div className="relative w-full h-full flex items-center justify-center">
                {date.getDate()}
                {hasEvent && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
            </div>
        );

        if (hasEvent) {
            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="w-full h-full">{DayComponent}</button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                        <div className="font-semibold text-sm mb-2">{format(date, "PPP")}</div>
                        <div className="space-y-2">
                            {dayEvents.map(event => (
                                <div key={event.id} className="flex items-center gap-2 text-xs">
                                    <div className={cn("p-1.5 rounded-full", eventTypeColors[event.type as keyof typeof eventTypeColors])}>
                                        {eventTypeIcons[event.type as keyof typeof eventTypeIcons]}
                                    </div>
                                    <span className="flex-grow">{event.title}</span>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>
            );
        }

        return DayComponent;
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    My Calendar
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="p-0"
                    modifiers={{
                        hasEvent: (d) => eventDates.some(eventDate => isSameDay(eventDate, d)),
                    }}
                    modifiersClassNames={{
                        hasEvent: 'relative',
                    }}
                    components={{
                      DayContent: (props) => <DayContent {...props} />,
                    }}
                />
            </CardContent>
        </Card>
    );
}
