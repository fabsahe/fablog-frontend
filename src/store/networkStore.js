import { create } from 'zustand'

const useNetworkStore = create((set) => ({
  online: false,
  actions: {
    changeNetworkStatus: (newStatus) => set({ online: newStatus })
  }
}))

export const useOnline = () => useNetworkStore((state) => state.online)
export const useNetworkActions = () => useNetworkStore((state) => state.actions)
