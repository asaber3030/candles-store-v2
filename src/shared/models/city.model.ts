import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class City extends BaseModel<typeof prisma.city> {
  static model = prisma.city
}
