import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class Coupon extends BaseModel<typeof prisma.coupon> {
  static model = prisma.coupon
}
