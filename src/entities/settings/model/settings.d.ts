import z from "zod"

import { SettingsSchema } from "./settings.schema"

type TUpdateSettingsPayload = z.infer<typeof SettingsSchema>
