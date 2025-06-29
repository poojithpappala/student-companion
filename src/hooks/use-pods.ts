
import podsData from '@/lib/stubs/pods.json';
import { usePodStore } from '@/hooks/use-pod-store';

export type Pod = (typeof podsData)[0];

export function usePods() {
    const { joinPod: join } = usePodStore();

    // In a real app, this would be an async fetch.
    const pods = podsData;

    const joinPod = (podId: string) => {
        const podToJoin = pods.find(p => p.id === podId);
        if (podToJoin) {
            join(podToJoin);
        }
    };

    return { pods, joinPod };
}
