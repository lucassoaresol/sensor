import { z } from 'zod'
import { CreateDumpSchema } from '../schemas'

export type ICreateDumpRequest = z.infer<typeof CreateDumpSchema>
