import { create } from 'zustand'

const usePostStore = create((set) => ({
  allPosts: [],
  filteredPosts: [],
  actions: {
    saveAllPosts: (newList) => {
      set({ allPosts: newList })
    },
    saveFilteredPosts: (newList) => {
      set({ filteredPosts: newList })
    }
  }
}))

export const useAllPosts = () => usePostStore((state) => state.allPosts)
export const useFilteredPosts = () =>
  usePostStore((state) => state.filteredPosts)
export const usePostActions = () => usePostStore((state) => state.actions)
