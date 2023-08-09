import { IMovieBox } from '@/interface'
import { create } from 'zustand'

interface IResultStore {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  listResult: IMovieBox[]
  setListResult: (listResult: IMovieBox[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useResultStore = create<IResultStore>((set, get) => {
  return {
    searchQuery: '',
    setSearchQuery: (searchQuery) => {
      set({
        searchQuery,
      })
    },
    listResult: [],
    setListResult: (listResult: IMovieBox[]) => {
      set({ listResult, loading: false })
    },
    loading: true,
    setLoading: (loading: boolean) => {
      set({ loading })
    },
  }
})
