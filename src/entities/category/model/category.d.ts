import z from "zod"
import { CreateCategorySchema } from "./category.schema"

type TCreateCategoryPayload = z.infer<typeof CreateCategorySchema>
