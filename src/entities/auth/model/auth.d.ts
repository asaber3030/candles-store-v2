import z from "zod"
import { AuthUpdateInformationSchema, AuthUpdatePasswordSchema } from "./auth.schema"

type TLoginType = "user" | "admin" | "deliveryCompany"
type TUpdateInformationPayload = z.infer<typeof AuthUpdateInformationSchema>
type TUpdatePasswordPayload = z.infer<typeof AuthUpdatePasswordSchema>
