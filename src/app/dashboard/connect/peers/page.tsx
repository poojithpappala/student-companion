
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
import { Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PeersPage() {
    const { peers } = usePeers();
    const { peerFilters, setPeerFilters, selectedPeers } = useConnectStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredPeers = peers.filter(peer => 
        peerFilters.length === 0 || peer.domains.some(domain => peerFilters.includes(domain))
    );

    const canGroupUp = selectedPeers.length >= 2 && selectedPeers.length <= 4;

    return (
        <>
            <div className="w-full space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">Find Collaborators</CardTitle>
                        <CardDescription>Connect with peers who share your skills and interests.</CardDescription>
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
