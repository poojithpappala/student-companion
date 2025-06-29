
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon } from 'lucide-react';
import { CalendarView } from '@/components/dashboard/connect/calendar-view';

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
                <CardContent>
                    <CalendarView />
                </CardContent>
            </Card>
        </div>
    );
}
