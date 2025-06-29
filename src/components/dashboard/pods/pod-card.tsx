
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { motion } from 'framer-motion';

type Pod = {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    maxMembers: number;
    tags: string[];
};

interface PodCardProps {
  pod: Pod;
  onJoin: (podId: string) => void;
  animationDelay: number;
}

export function PodCard({ pod, onJoin, animationDelay }: PodCardProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: animationDelay }}
    >
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle className="font-headline">{pod.name}</CardTitle>
                <CardDescription>{pod.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{pod.memberCount} / {pod.maxMembers} members</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {pod.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => onJoin(pod.id)}>
                    Join Pod
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
  );
}
