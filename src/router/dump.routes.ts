import { Router } from 'express'
import { validateSchemaMiddleware } from '../middlewares'
import { createDumpController, listDumpController } from '../controllers'
import { CreateDumpSchema } from '../schemas'

export const dumpRouter = Router()

dumpRouter.post(
  '',
  validateSchemaMiddleware(CreateDumpSchema),
  createDumpController,
)

dumpRouter.get('', listDumpController)
