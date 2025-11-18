import { OrderStatusEnum } from "@prisma/client"
import { Check, Eye, PackageCheck, TriangleAlert, Truck, X } from "lucide-react"

export const orderStatusEnumIconObject = {
  [OrderStatusEnum.JustOrdered]: Eye,
  [OrderStatusEnum.Reviewed]: Check,
  [OrderStatusEnum.OutForDelivery]: Truck,
  [OrderStatusEnum.Delivered]: PackageCheck,
  [OrderStatusEnum.Canceled]: X,
  [OrderStatusEnum.Refused]: TriangleAlert
}
