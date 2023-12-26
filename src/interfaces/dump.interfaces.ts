import { z } from 'zod'
import {
  CollectionUpdateRequestSchema,
  CreateCollectionSchema,
  CreateDumpSchema,
  CreateRouteSchema,
  RouteUpdateRequestSchema,
} from '../schemas'

export interface IDumpQuery {
  lat?: string
  lon?: string
  sector?: string
}

export type ICreateDumpRequest = z.infer<typeof CreateDumpSchema>

export type ICreateCollectionRequest = z.infer<typeof CreateCollectionSchema>

export type ICreateRouteRequest = z.infer<typeof CreateRouteSchema>

export type IRouteUpdateRequest = z.infer<typeof RouteUpdateRequestSchema>

export type ICollectionUpdateRequest = z.infer<
  typeof CollectionUpdateRequestSchema
>
