import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "react-toastify"
import { CartItem, CartState } from "./cart"

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const finalUnitPrice = item.size?.price ?? item.unitPrice

          const existingItem = state.items.find((i) => i.id === item.id)

          if (existingItem) {
            const newQuantity = existingItem.quantity + item.quantity

            toast.success(`${item.name} quantity updated!`)

            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: newQuantity,
                      unitPrice: finalUnitPrice,
                      totalPrice: newQuantity * finalUnitPrice,
                      size: item.size ?? i.size,
                      color: item.color ?? i.color
                    }
                  : i
              )
            }
          }

          toast.success(`${item.name} added to cart!`)

          return {
            items: [
              ...state.items,
              {
                ...item,
                unitPrice: finalUnitPrice,
                totalPrice: finalUnitPrice * item.quantity
              }
            ]
          }
        }),

      getItem: (id) => get().items.find((i) => i.id === id),

      isItemAdded: (id) => get().items.some((i) => i.id === id),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                  totalPrice: (i.quantity + 1) * i.unitPrice
                }
              : i
          )
        })),

      decreaseQuantity: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id)
          if (!item) return { items: state.items }

          if (item.quantity === 1) {
            toast.info(`${item.name} removed from cart!`)
            return { items: state.items.filter((i) => i.id !== id) }
          }

          return {
            items: state.items.map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                    totalPrice: (i.quantity - 1) * i.unitPrice
                  }
                : i
            )
          }
        }),

      removeItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id)
          if (item) toast.info(`${item.name} removed from cart!`)

          return { items: state.items.filter((i) => i.id !== id) }
        }),

      clearCart: () => {
        toast.info("Cart cleared!")
        set({ items: [] })
      },

      getTotal: () => get().items.reduce((t, item) => t + item.totalPrice, 0)
    }),

    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items })
    }
  )
)
