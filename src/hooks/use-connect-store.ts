
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ConnectState = {
  hackathonFilters: string[];
  registeredHackathons: string[];
  peerFilters: string[];
  connectedPeers: string[];
  selectedPeers: string[];
  setHackathonFilters: (filters: string[]) => void;
  toggleHackathonRegistration: (hackathonId: string) => void;
  setPeerFilters: (filters: string[]) => void;
  togglePeerConnection: (peerId: string) => void;
  togglePeerSelection: (peerId: string) => void;
  clearPeerSelection: () => void;
};

export const useConnectStore = create<ConnectState>()(
  persist(
    (set) => ({
      hackathonFilters: [],
      registeredHackathons: [],
      peerFilters: [],
      connectedPeers: [],
      selectedPeers: [],
      setHackathonFilters: (filters) => set({ hackathonFilters: filters }),
      toggleHackathonRegistration: (hackathonId) => set((state) => ({
        registeredHackathons: state.registeredHackathons.includes(hackathonId)
          ? state.registeredHackathons.filter((id) => id !== hackathonId)
          : [...state.registeredHackathons, hackathonId],
      })),
      setPeerFilters: (filters) => set({ peerFilters: filters }),
      togglePeerConnection: (peerId) => set((state) => ({
        connectedPeers: state.connectedPeers.includes(peerId)
          ? state.connectedPeers.filter((id) => id !== peerId)
          : [...state.connectedPeers, peerId],
      })),
      togglePeerSelection: (peerId) => set((state) => ({
        selectedPeers: state.selectedPeers.includes(peerId)
          ? state.selectedPeers.filter((id) => id !== peerId)
          : [...state.selectedPeers, peerId],
      })),
      clearPeerSelection: () => set({ selectedPeers: [] }),
    }),
    {
      name: 'connect-feature-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
