import z from "zod"

import { Address, City, Country, User } from "@prisma/client"
import { CreateAddressSchema, CreateUserSchema } from "./user.schema"

export type TCreateAdminPayload = z.infer<typeof CreateUserSchema>
export type TCreateAddressPayload = z.infer<typeof CreateAddressSchema>

export type FullUser = User & {
  country: Country
  city: City
}

export type FullAddress = Address & {
  country: Country
  city: City
}
