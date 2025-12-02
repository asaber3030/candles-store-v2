import { TDefaultUser } from "@/entities/auth/model/auth"
import { FullAddress } from "@/entities/user/model/user"
import { Address, Coupon, Order, OrderItem, User, Product } from "@prisma/client"

export type FullOrder = Order & {
  coupon: Coupon | null
  user: TDefaultUser
  address: FullAddress
  company: User | null
  items: FullOrderItem[]
}

export type FullOrderItem = OrderItem & {
  product: Product
}
