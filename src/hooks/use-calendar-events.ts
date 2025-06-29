
import eventsData from '@/lib/stubs/calendar-events.json';
import { useState, useEffect } from 'react';

export type CalendarEvent = (typeof eventsData)[0];

export function useCalendarEvents() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);

    useEffect(() => {
        // In a real app, this would be an async fetch.
        setEvents(eventsData);
    }, []);

    return { events };
}
