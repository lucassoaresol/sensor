import { z } from 'zod'

export const SessionSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RecoveryPasswordSchema = z.object({
  email: z.string().email(),
})

export const PasswordUpdateSchema = z.object({ password: z.string() })
