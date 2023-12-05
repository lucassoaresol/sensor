import { z } from 'zod'

export const CreateDumpSchema = z.object({
  name: z.string(),
})

export const DumpReturnSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    label: z.string().optional(),
    sector: z.string(),
    lat: z.number(),
    long: z.number(),
    cap: z.number(),
    value: z.number(),
    prc: z.number().optional().default(0),
    is_collecting: z.boolean().optional().default(false),
    is_active: z.boolean(),
  })
  .refine((fields) => {
    if (fields.value > 0)
      return (fields.prc = (fields.value / fields.cap) * 100)
    return fields
  })
  .refine((fields) => (fields.label = fields.name))

export const DumpReturnArraySchema = DumpReturnSchema.array()
