import { Router } from 'express'
import { createUserController, listUserController } from '../controllers'
import { validateSchemaMiddleware } from '../middlewares'
import { CreateUserSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  validateSchemaMiddleware(CreateUserSchema),
  createUserController,
)

userRouter.get('', listUserController)
