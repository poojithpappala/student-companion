
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePodStore } from '@/hooks/use-pod-store';

const MOCK_MEMBERS = [
    { name: 'Alex Ray', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Brenda Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Charlie Day', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Diana Prince', avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Ethan Hunt', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Fiona Glenanne', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1080&auto=format&fit=crop' },
    { name: 'George Costanza', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Helen Troy', avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Ian Malcolm', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Jane Eyre', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Kyle Broflovski', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1080&auto=format&fit=crop' },
    { name: 'Laura Palmer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1080&auto=format&fit=crop' },
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
