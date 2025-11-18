import z from "zod"
import { CreateCountrySchema } from "./country.schema"

type TCreateCountryPayload = z.infer<typeof CreateCountrySchema>
