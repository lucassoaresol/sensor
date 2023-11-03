import { Router } from 'express'
import { createReadController, listReadController } from '../controllers'

export const readRouter = Router()

readRouter.post('/:dump_id', createReadController)

readRouter.get('', listReadController)
