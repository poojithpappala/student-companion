
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Pod } from '@/hooks/use-pods';


interface PodState {
  currentPod: Pod | null;
  joinPod: (pod: Pod) => void;
  leavePod: () => void;
}

export const usePodStore = create<PodState>()(
  persist(
    (set) => ({
      currentPod: null,
      joinPod: (pod) => set({ currentPod: pod }),
      leavePod: () => set({ currentPod: null }),
    }),
    {
      name: 'pod-accountability-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
