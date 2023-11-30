import { z } from 'zod'

export const CreateDumpSchema = z.object({
  name: z.string(),
})

export const DumpReturnSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    sector: z.string(),
    lat: z.number(),
    lng: z.number(),
    cap: z.number(),
    value: z.number(),
    prc: z.number().optional(),
    is_collecting: z.boolean(),
    is_active: z.boolean(),
  })
  .refine((fields) => (fields.prc = (fields.value / fields.cap) * 100))

export const DumpReturnArraySchema = DumpReturnSchema.array()
