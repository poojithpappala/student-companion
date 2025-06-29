
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePodStore } from '@/hooks/use-pod-store';

const MOCK_MEMBERS = [
    { name: 'Alex Ray', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Brenda Smith', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Charlie Day', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Diana Prince', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Ethan Hunt', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Fiona Glenanne', avatar: 'https://placehold.co/40x40.png' },
    { name: 'George Costanza', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Helen Troy', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Ian Malcolm', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Jane Eyre', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Kyle Broflovski', avatar: 'https://placehold.co/40x40.png' },
    { name: 'Laura Palmer', avatar: 'https://placehold.co/40x40.png' },
];

export function MembersList() {
    const { currentPod } = usePodStore();

    if (!currentPod) return null;
    
    const members = MOCK_MEMBERS.slice(0, currentPod.memberCount);

    return (
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {members.map((member, index) => (
                <div key={index} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                    <Avatar>
                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="person face" />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{member.name.split(' ')[0]}</span>
                </div>
            ))}
        </div>
    );
}
