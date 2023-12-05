import { z } from 'zod'
import { CreateDumpSchema } from '../schemas'

export interface IDumpQuery {
  lat?: string
  long?: string
  sector?: string
}

export type ICreateDumpRequest = z.infer<typeof CreateDumpSchema>
