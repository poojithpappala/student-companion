
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePeers } from '@/hooks/use-peers';
import { useConnectStore } from '@/hooks/use-connect-store';
import { hackathonDomains } from '@/hooks/use-hackathons';
import { CollaboratorCard } from '@/components/dashboard/connect/collaborator-card';
import { DomainFilter } from '@/components/dashboard/connect/domain-filter';
import { GroupUpModal } from '@/components/dashboard/connect/group-up-modal';
import { Users, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFriendSuggestions } from '@/hooks/use-friend-suggestions';
import { FriendCard } from '@/components/dashboard/connect/friend-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from '@/components/ui/separator';

export default function PeersPage() {
    const { peers } = usePeers();
    const { suggestions } = useFriendSuggestions();
    const { peerFilters, setPeerFilters, selectedPeers } = useConnectStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredPeers = peers.filter(peer => 
        peerFilters.length === 0 || peer.domains.some(domain => peerFilters.includes(domain))
    );

    const filteredSuggestions = suggestions.filter(suggestion =>
        peerFilters.length === 0 || suggestion.sharedDomains.some(domain => peerFilters.includes(domain))
    );

    const canGroupUp = selectedPeers.length >= 2 && selectedPeers.length <= 4;

    return (
        <>
            <div className="w-full space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary flex items-center gap-2"><Users /> Find Collaborators</CardTitle>
                        <CardDescription>Connect with peers who share your skills and interests for upcoming projects and hackathons.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 max-w-sm">
                            <DomainFilter allDomains={hackathonDomains} selectedDomains={peerFilters} onFilterChange={setPeerFilters} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPeers.map((peer, index) => (
                                <CollaboratorCard key={peer.id} peer={peer} animationDelay={index * 0.1} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Separator />
                
                <div className="space-y-6">
                    <div>
                        <h2 className="font-headline text-2xl text-primary flex items-center gap-2"><UserPlus /> Friend Suggestions</h2>
                        <p className="text-muted-foreground">Expand your network with these AI-powered suggestions.</p>
                    </div>

                    <div className="md:hidden">
                        <Carousel opts={{ align: "start", loop: true }} className="w-full">
                            <CarouselContent>
                                {filteredSuggestions.map((suggestion, index) => (
                                    <CarouselItem key={suggestion.id} className="basis-4/5">
                                        <FriendCard suggestion={suggestion} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="ml-12" />
                            <CarouselNext className="mr-12" />
                        </Carousel>
                    </div>

                    <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {filteredSuggestions.map((suggestion, index) => (
                            <FriendCard key={suggestion.id} suggestion={suggestion} animationDelay={index * 0.1} />
                        ))}
                    </div>
                </div>

            </div>
            
            <AnimatePresence>
                {canGroupUp && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-8 right-1/2 translate-x-1/2 z-20"
                    >
                        <Button size="lg" className="shadow-2xl" onClick={() => setIsModalOpen(true)}>
                            <Users className="mr-2 h-5 w-5" />
                            Create Group ({selectedPeers.length})
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <GroupUpModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
        </>
    );
}
