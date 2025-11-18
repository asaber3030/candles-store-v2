import prisma from "../api/prisma"
import { BaseModel } from "./base.model"

export class User extends BaseModel<typeof prisma.user> {
  static model = prisma.user
}
