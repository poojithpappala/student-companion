
"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import type { Hackathon } from '@/hooks/use-hackathons';
import { useCountdown } from '@/hooks/use-countdown';
import { useConnectStore } from '@/hooks/use-connect-store';
import { cn } from '@/lib/utils';

interface HackathonCardProps {
  hackathon: Hackathon;
  animationDelay: number;
}

export function HackathonCard({ hackathon, animationDelay }: HackathonCardProps) {
  const countdown = useCountdown(hackathon.startDate);
  const { registeredHackathons, toggleHackathonRegistration } = useConnectStore();
  const isRegistered = registeredHackathons.includes(hackathon.id);

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleHackathonRegistration(hackathon.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
    >
      <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Image src={hackathon.logoUrl} alt={`${hackathon.title} logo`} width={48} height={48} className="rounded-md border" data-ai-hint="logo" />
            <div>
              <CardTitle className="font-headline text-lg">{hackathon.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {hackathon.domains.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{countdown}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{hackathon.mode} - {hackathon.location.label}</span>
          </div>
        </CardContent>
        <CardFooter>
          <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button
              className={cn("w-full", isRegistered && "bg-secondary hover:bg-secondary/90 text-secondary-foreground")}
              onClick={handleRegister}
            >
              {isRegistered ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" /> Registered
                </>
              ) : (
                "Register"
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
