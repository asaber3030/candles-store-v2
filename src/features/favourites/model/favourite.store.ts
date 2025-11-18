import { create } from "zustand"
import { persist } from "zustand/middleware"
import { FavouritesState } from "./favourite"

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: (item) =>
        set((state) => {
          if (state.favourites.some((f) => f.id === item.id)) return state
          return { favourites: [...state.favourites, item] }
        }),

      removeFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.filter((f) => f.id !== id)
        })),

      toggleFavourite: (item) => {
        const exists = get().isFavourite(item.id)
        if (exists) {
          get().removeFavourite(item.id)
        } else {
          get().addFavourite(item)
        }
      },

      isFavourite: (id) => get().favourites.some((f) => f.id === id),

      clearFavourites: () => set({ favourites: [] })
    }),

    {
      name: "favourites-storage",
      partialize: (state) => ({ favourites: state.favourites })
    }
  )
)
