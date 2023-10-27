import { z } from 'zod'
import { CreateReadSchema } from '../schemas'

export type ICreateReadRequest = z.infer<typeof CreateReadSchema>
