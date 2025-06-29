
"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { List, Map } from 'lucide-react';
import { useHackathons, hackathonDomains } from '@/hooks/use-hackathons';
import { useConnectStore } from '@/hooks/use-connect-store';
import { HackathonCard } from '@/components/dashboard/connect/hackathon-card';
import { DomainFilter } from '@/components/dashboard/connect/domain-filter';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';

const HackathonMap = dynamic(() => import('@/components/dashboard/connect/hackathon-map'), { 
    ssr: false,
    loading: () => <Skeleton className="h-full w-full rounded-lg" />
});

export default function HackathonsPage() {
    const [view, setView] = useState<'list' | 'map'>('list');
    const { hackathons } = useHackathons();
    const { hackathonFilters, setHackathonFilters } = useConnectStore();

    const filteredHackathons = hackathons.filter(hackathon => 
        hackathonFilters.length === 0 || hackathon.domains.some(domain => hackathonFilters.includes(domain))
    );

    return (
        <div className="w-full space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="font-headline text-2xl text-primary">Upcoming Hackathons</CardTitle>
                            <CardDescription>Discover events, build projects, and win prizes.</CardDescription>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            {/* Filter for Mobile */}
                            <div className="sm:hidden flex-grow">
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="w-full">Filter Domains</Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <div className="p-4">
                                            <h3 className="font-headline text-lg mb-4">Filter by Domain</h3>
                                            <DomainFilter allDomains={hackathonDomains} selectedDomains={hackathonFilters} onFilterChange={setHackathonFilters} />
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>
                            {/* View Toggle */}
                            <div className="p-1 bg-secondary rounded-md flex">
                                <Button size="sm" variant={view === 'list' ? 'default' : 'ghost'} onClick={() => setView('list')} className="h-8"><List className="h-4 w-4" /></Button>
                                <Button size="sm" variant={view === 'map' ? 'default' : 'ghost'} onClick={() => setView('map')} className="h-8"><Map className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                     {/* Filter for Desktop */}
                    <div className="hidden sm:block mb-6 max-w-sm">
                        <DomainFilter allDomains={hackathonDomains} selectedDomains={hackathonFilters} onFilterChange={setHackathonFilters} />
                    </div>
                    {view === 'list' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredHackathons.map((hackathon, index) => (
                                <HackathonCard key={hackathon.id} hackathon={hackathon} animationDelay={index * 0.1} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[600px] w-full">
                            <HackathonMap hackathons={filteredHackathons} />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
