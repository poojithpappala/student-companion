
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Notification } from './use-notifications';

type ConnectState = {
  hackathonFilters: string[];
  registeredHackathons: string[];
  peerFilters: string[];
  connectedPeers: string[];
  selectedPeers: string[];
  notifications: Notification[];
  sentFriendRequests: string[];
  
  setHackathonFilters: (filters: string[]) => void;
  toggleHackathonRegistration: (hackathonId: string) => void;
  setPeerFilters: (filters: string[]) => void;
  togglePeerConnection: (peerId: string) => void;
  togglePeerSelection: (peerId: string) => void;
  clearPeerSelection: () => void;
  
  initNotifications: (notifications: Notification[]) => void;
  markNotificationAsRead: (id: string) => void;
  sendFriendRequest: (id: string) => void;
};

export const useConnectStore = create<ConnectState>()(
  persist(
    (set) => ({
      hackathonFilters: [],
      registeredHackathons: [],
      peerFilters: [],
      connectedPeers: [],
      selectedPeers: [],
      notifications: [],
      sentFriendRequests: [],

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

      initNotifications: (notifications) => set((state) => {
        // Only initialize if notifications are not already in the store
        if (state.notifications.length === 0) {
            return { notifications };
        }
        return {};
      }),
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
      })),
      sendFriendRequest: (id) => set((state) => ({
        sentFriendRequests: state.sentFriendRequests.includes(id)
          ? state.sentFriendRequests
          : [...state.sentFriendRequests, id],
      })),
    }),
    {
      name: 'connect-feature-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
