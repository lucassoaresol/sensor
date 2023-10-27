import { z } from 'zod'

export const CreateReadSchema = z.object({
  value: z.number(),
})
