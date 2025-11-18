import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class Category extends BaseModel<typeof prisma.category> {
  static model = prisma.category
}
