
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus, MessageSquare, Check } from 'lucide-react';
import Image from 'next/image';
import type { FriendSuggestion } from '@/hooks/use-friend-suggestions';
import { useConnectStore } from '@/hooks/use-connect-store';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface FriendCardProps {
  suggestion: FriendSuggestion;
  animationDelay?: number;
}

export function FriendCard({ suggestion, animationDelay = 0 }: FriendCardProps) {
  const { sentFriendRequests, sendFriendRequest } = useConnectStore();
  const { toast } = useToast();
  const isRequested = sentFriendRequests.includes(suggestion.id);

  const handleAddFriend = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRequested) return;
    
    sendFriendRequest(suggestion.id);
    toast({
      title: 'Friend Request Sent!',
      description: `Your request has been sent to ${suggestion.name}.`,
    });
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
            <Image src={suggestion.avatarUrl} alt={suggestion.name} width={48} height={48} className="rounded-full" data-ai-hint="person face" />
            <div>
              <CardTitle className="font-headline text-lg">{suggestion.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{suggestion.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Shared Interests:</p>
          <div className="flex flex-wrap gap-2">
            {suggestion.sharedDomains.map((domain) => (
              <Badge key={domain} variant="secondary">{domain}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
                <Link href={`/dashboard/chat/${suggestion.id}`}><MessageSquare className="h-4 w-4" /></Link>
            </Button>
            <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                    size="sm"
                    className={cn(isRequested && "bg-secondary hover:bg-secondary/90 text-secondary-foreground")}
                    onClick={handleAddFriend}
                    disabled={isRequested}
                >
                    {isRequested ? (
                        <><Check className="mr-2 h-4 w-4" /> Requested</>
                    ) : (
                        <><UserPlus className="mr-2 h-4 w-4" /> Add Friend</>
                    )}
                </Button>
            </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
