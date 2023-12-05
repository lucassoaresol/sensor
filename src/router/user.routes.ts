import { Router } from 'express'
import {
  createUserController,
  listUserController,
  profileUserController,
} from '../controllers'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import { CreateUserSchema } from '../schemas'

export const userRouter = Router()

userRouter.post(
  '',
  validateSchemaMiddleware(CreateUserSchema),
  createUserController,
)

userRouter.get('', listUserController)

userRouter.get('/profile', verifyUserIsAuthenticated, profileUserController)
