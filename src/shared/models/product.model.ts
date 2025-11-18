import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class Product extends BaseModel<typeof prisma.product> {
  static model = prisma.product
}
