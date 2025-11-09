// useTrailerStore.ts
import { create } from 'zustand'

interface TrailerStore {
  isOpen: boolean
  mediaId: number | null
  mediaType: 'movie' | 'tv' | null
  openModal: (mediaId: number, mediaType?: 'movie' | 'tv') => void
  closeModal: () => void
}

export const useTrailerStore = create<TrailerStore>(set => ({
  isOpen: false,
  mediaId: null,
  mediaType: null,
  openModal: (mediaId, mediaType = 'movie') =>
    set({ isOpen: true, mediaId, mediaType }),
  closeModal: () => set({ isOpen: false, mediaId: null, mediaType: null }),
}))
