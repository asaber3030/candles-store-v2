import { Order, OrderItem, Product, User, Coupon, ProductSize, ProductColor } from "@prisma/client"
import { FullAddress } from "@/entities/user/model/user"
import { TDefaultUser } from "@/entities/auth/model/auth"

export type FullOrder = Order & {
  coupon: Coupon | null
  user: TDefaultUser
  address: FullAddress
  company: TDefaultUser | null
  items: FullOrderItem[]
}

export type FullOrderItem = OrderItem & {
  product: Product
  size?: ProductSize | null
  color?: ProductColor | null
}
