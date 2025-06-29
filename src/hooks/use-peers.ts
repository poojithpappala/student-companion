
import peersData from '@/lib/stubs/peers.json';

export type Peer = (typeof peersData)[0];

export function usePeers() {
    // In a real app, this would be an async fetch.
    const peers: Peer[] = peersData;

    return { peers };
}
