
"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePodStore } from '@/hooks/use-pod-store';

const MOCK_MEMBERS = [
    { name: 'Alex Ray', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW58ZW58MHx8fHwxNzUxMTg5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Brenda Smith', avatar: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21lbnxlbnwwfHx8fDE3NTExNTM3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Charlie Day', avatar: 'https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtYW58ZW58MHx8fHwxNzUxMTg5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Diana Prince', avatar: 'https://images.unsplash.com/photo-1481214110143-ed630356e1bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b21lbnxlbnwwfHx8fDE3NTExNTM3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Ethan Hunt', avatar: 'https://images.unsplash.com/photo-1615109398623-88346a601842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW58ZW58MHx8fHwxNzUxMTg5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Fiona Glenanne', avatar: 'https://images.unsplash.com/photo-1560087637-bf797bc7796a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21lbnxlbnwwfHx8fDE3NTExNTM3Njl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'George Costanza', avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtYW58ZW58MHx8fHwxNzUxMTg5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Helen Troy', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8Z2lybHxlbnwwfHx8fDE3NTEwNzI1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Ian Malcolm', avatar: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYW58ZW58MHx8fHwxNzUxMTg5MDk2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Jane Eyre', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080&auto=format&fit=crop' },
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
