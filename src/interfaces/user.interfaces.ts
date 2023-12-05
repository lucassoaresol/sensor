import { z } from 'zod'
import { CreateUserSchema } from '../schemas'

export type IRole = 'ADMIN' | 'COLLE'

export interface IRequestUser {
  id: string
  role: IRole
}

export type ICreateUserRequest = z.infer<typeof CreateUserSchema>
