import z from "zod"
import { CreateCouponSchema } from "./coupon.schema"

type TCreateCouponPayload = z.infer<typeof CreateCouponSchema>
