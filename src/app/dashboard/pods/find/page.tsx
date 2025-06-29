
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { usePods } from '@/hooks/use-pods';
import { PodCard } from '@/components/dashboard/pods/pod-card';

export default function FindPodPage() {
    const router = useRouter();
    const { pods, joinPod } = usePods();
    const [searchTerm, setSearchTerm] = useState('');

    const handleJoin = (podId: string) => {
        joinPod(podId);
        router.push('/dashboard/pods/my-pod');
    };

    const filteredPods = pods.filter(pod =>
        pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pod.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="w-full space-y-8">
            <div className="text-center">
                <h1 className="font-headline text-3xl text-primary">Find Your Accountability Pod</h1>
                <p className="mt-2 text-lg text-muted-foreground">Join a group of peers to stay motivated and achieve your goals together.</p>
            </div>
            
            <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search pods by name or tag (e.g., 'Software Engineering')"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPods.map((pod, index) => (
                    <PodCard key={pod.id} pod={pod} onJoin={handleJoin} animationDelay={index * 0.1} />
                ))}
            </div>
        </div>
    );
}
