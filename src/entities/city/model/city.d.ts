import z from "zod"
import { CreateCitySchema } from "./city.schema"

type TCreateCityPayload = z.infer<typeof CreateCitySchema>
