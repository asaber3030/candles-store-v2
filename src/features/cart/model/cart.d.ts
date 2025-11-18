import { ProductColor, ProductSize } from "@prisma/client"

export type CartItem = {
  id: number
  image: string
  name: string
  unitPrice: number
  quantity: number
  totalPrice: number
  size?: ProductSize
  color?: ProductColor
}

export type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "totalPrice">) => void
  removeItem: (id: number) => void
  isItemAdded: (id: number) => boolean
  getItem: (id: number) => CartItem | undefined
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
  getTotal: () => number
}
