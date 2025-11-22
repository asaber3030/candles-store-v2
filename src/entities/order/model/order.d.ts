import { Order, OrderItem, Product, User, Coupon } from "@prisma/client"
import { FullAddress } from "@/entities/user/model/user"

export type FullOrder = Order & {
  coupon: Coupon | null
  user: User
  address: FullAddress
  company: User | null
  items: FullOrderItem[]
}

export type FullOrderItem = OrderItem & {
  product: Product
}
