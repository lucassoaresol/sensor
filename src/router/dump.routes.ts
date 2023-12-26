import { Router } from 'express'
import {
  validateSchemaMiddleware,
  verifyUserIsAuthenticated,
} from '../middlewares'
import {
  createCollectionController,
  createDumpController,
  createReserveController,
  createRouteController,
  listDumpController,
  updateCollectionController,
  updateRouteController,
} from '../controllers'
import {
  CollectionUpdateRequestSchema,
  CreateCollectionSchema,
  CreateDumpSchema,
  CreateRouteSchema,
  RouteUpdateRequestSchema,
} from '../schemas'

export const dumpRouter = Router()

dumpRouter.post(
  '',
  validateSchemaMiddleware(CreateDumpSchema),
  createDumpController,
)

dumpRouter.post(
  '/:dump_id/route',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(CreateRouteSchema),
  createRouteController,
)

dumpRouter.post(
  '/:dump_id/reserve',
  verifyUserIsAuthenticated,
  createReserveController,
)

dumpRouter.patch(
  '/route/:route_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(RouteUpdateRequestSchema),
  updateRouteController,
)

dumpRouter.post(
  '/:dump_id/collection',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(CreateCollectionSchema),
  createCollectionController,
)

dumpRouter.patch(
  '/collection/:collection_id',
  verifyUserIsAuthenticated,
  validateSchemaMiddleware(CollectionUpdateRequestSchema),
  updateCollectionController,
)

dumpRouter.get('', listDumpController)
