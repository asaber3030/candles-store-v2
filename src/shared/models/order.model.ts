import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class Order extends BaseModel<typeof prisma.order> {
  static allowedOrderBy = ["id", "orderedAt", "deliveredAt", "total", "subTotal"]

  static model = prisma.order
}
