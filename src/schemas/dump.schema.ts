import dayjs from 'dayjs'
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
    lon: z.number(),
    cap: z.number(),
    value: z.number(),
    prc: z.number().optional().default(0),
    is_collecting: z.boolean().optional().default(false),
    is_active: z.boolean(),
    routes: z.object({ created_at: z.date() }).array().optional(),
    reserve: z.object({ created_at: z.date() }).nullable().optional(),
    collections: z.object({ created_at: z.date() }).array().optional(),
  })
  .refine((fields) => {
    if (fields.value > 0)
      return (fields.prc = (fields.value / fields.cap) * 100)
    return fields
  })
  .refine((fields) => (fields.label = fields.name))
  .refine((fields) => {
    if (fields.reserve) {
      if (dayjs().diff(fields.reserve.created_at, 'minute') <= 5)
        return (fields.is_collecting = true)
    } else if (fields.routes) {
      if (
        fields.routes.filter((el) => dayjs().diff(el.created_at, 'h') <= 1)
          .length > 0
      )
        return (fields.is_collecting = true)
    } else if (Number(fields.collections?.length) > 0)
      return (fields.is_collecting = true)

    return fields
  })

export const DumpReturnArraySchema = DumpReturnSchema.array()

export const CreateCollectionSchema = z.object({
  date: z.string(),
  month: z.string(),
  year: z.number(),
})

export const CreateRouteSchema = z.object({
  date: z.string(),
  lat: z.number(),
  lon: z.number(),
  month: z.string(),
  year: z.number(),
})

export const RouteUpdateRequestSchema = z.object({
  status: z.enum(['CANCELED', 'CONCLUDED']),
})

export const CollectionUpdateRequestSchema = z
  .object({
    value: z.number(),
    status: z.enum(['CANCELED', 'CONCLUDED']),
  })
  .partial()
