import { z } from 'zod'

export const CreateUserSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['ADMIN', 'COLLE']).optional(),
})
