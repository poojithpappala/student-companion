
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, Link as LinkIcon, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import type { Peer } from '@/hooks/use-peers';
import { useConnectStore } from '@/hooks/use-connect-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface CollaboratorCardProps {
  peer: Peer;
  animationDelay: number;
}

export function CollaboratorCard({ peer, animationDelay }: CollaboratorCardProps) {
  const { connectedPeers, togglePeerConnection, selectedPeers, togglePeerSelection } = useConnectStore();
  const isConnected = connectedPeers.includes(peer.id);
  const isSelected = selectedPeers.includes(peer.id);

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    togglePeerConnection(peer.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Image src={peer.avatarUrl} alt={peer.name} width={48} height={48} className="rounded-full" data-ai-hint="person face" />
            <div>
              <CardTitle className="font-headline text-lg">{peer.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{peer.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Skills &amp; Interests:</p>
          <div className="flex flex-wrap gap-2">
            {peer.domains.map((domain) => (
              <Badge key={domain} variant="outline">{domain}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={`select-${peer.id}`}
                    checked={isSelected}
                    onCheckedChange={() => togglePeerSelection(peer.id)}
                />
                <label htmlFor={`select-${peer.id}`} className="text-sm font-medium leading-none cursor-pointer">
                    Select
                </label>
            </div>
            <div className="flex gap-2">
                 <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                    <Link href={`/dashboard/chat/${peer.id}`}><MessageSquare className="h-4 w-4" /></Link>
                 </Button>
                <motion.div whileTap={{ scale: 0.95 }}>
                    <Button
                        size="sm"
                        className={cn(isConnected && "bg-secondary hover:bg-secondary/90 text-secondary-foreground")}
                        onClick={handleConnect}
                    >
                        {isConnected ? (
                            <><CheckCircle className="mr-2 h-4 w-4" /> Connected</>
                        ) : (
                            <><LinkIcon className="mr-2 h-4 w-4" /> Connect</>
                        )}
                    </Button>
                </motion.div>
            </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
