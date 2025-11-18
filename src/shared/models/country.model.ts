import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class Country extends BaseModel<typeof prisma.country> {
  static model = prisma.country
}
