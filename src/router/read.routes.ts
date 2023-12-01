import { Router } from 'express'
import {
  createReadAllController,
  createReadController,
  listReadController,
} from '../controllers'

export const readRouter = Router()

readRouter.post('', createReadAllController)

readRouter.post('/:dump_id', createReadController)

readRouter.get('', listReadController)
