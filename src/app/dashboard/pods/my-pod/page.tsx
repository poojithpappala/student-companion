
"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePodStore } from '@/hooks/use-pod-store';
import { ActivityFeed } from '@/components/dashboard/pods/activity-feed';
import { MembersList } from '@/components/dashboard/pods/members-list';
import { Lightbulb } from 'lucide-react';

export default function MyPodDashboardPage() {
    const router = useRouter();
    const { currentPod, leavePod } = usePodStore();

    const handleLeave = () => {
        leavePod();
        router.push('/dashboard/pods/find');
    };

    if (!currentPod) {
        // This should not happen if the main pods page redirects correctly, but as a fallback:
        if (typeof window !== 'undefined') {
            router.replace('/dashboard/pods/find');
        }
        return null;
    }

    return (
        <div className="w-full space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <CardTitle className="font-headline text-2xl text-primary">{currentPod.name}</CardTitle>
                            <CardDescription>Your accountability pod dashboard.</CardDescription>
                        </div>
                        <Button variant="destructive" onClick={handleLeave}>Leave Pod</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Members</h3>
                    <MembersList />
                </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2">
                                <Lightbulb className="text-accent" />
                                Daily Nudge
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg">Your challenge for today: Complete one module of a course you've been putting off. Share your progress below!</p>
                        </CardContent>
                    </Card>
                    <ActivityFeed />
                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Pod Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm">Your Streak</h4>
                                <Badge className="bg-[hsl(var(--chart-3))] hover:bg-[hsl(var(--chart-3))] text-white mt-1">5-Day Streak 🔥</Badge>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">Pod Goal</h4>
                                <p className="text-muted-foreground text-sm mt-1">Everyone completes their weekly goals.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
