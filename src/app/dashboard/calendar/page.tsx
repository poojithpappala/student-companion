
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ListTodo } from 'lucide-react';
import { CalendarView } from '@/components/dashboard/calendar/calendar-view';
import { UpcomingEvents } from '@/components/dashboard/calendar/upcoming-events';

export default function CalendarPage() {
    return (
        <div className="w-full space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2">
                        <CalendarIcon />
                        Event Calendar
                    </CardTitle>
                    <CardDescription>
                        Keep track of hackathons, pod check-ins, interviews, and more.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <Card className="lg:col-span-2">
                    <CardContent className="p-2 sm:p-4">
                        <CalendarView />
                    </CardContent>
                </Card>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-lg flex items-center gap-2">
                                <ListTodo />
                                Upcoming Events
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UpcomingEvents />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
