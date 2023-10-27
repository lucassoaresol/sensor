import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares'
import { createReadController, listReadController } from '../controllers'
import { CreateReadSchema } from '../schemas'

export const readRouter = Router()

readRouter.post(
  '/:dump_id',
  validateSchemaMiddleware(CreateReadSchema),
  createReadController,
)

readRouter.get('', listReadController)
