import { z } from 'zod'

export const CreateDumpSchema = z.object({
  name: z.string(),
})
