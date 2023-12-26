import { Request, Response } from 'express'
import {
  createCollectionService,
  createDumpService,
  createReserveService,
  createRouteService,
  listDumpService,
  updateCollectionService,
  updateRouteService,
} from '../services'

export const createDumpController = async (req: Request, res: Response) => {
  const dump = await createDumpService(req.body)

  return res.status(201).json(dump)
}

export const listDumpController = async (req: Request, res: Response) => {
  const dumps = await listDumpService(req.query)

  return res.json(dumps)
}

export const createRouteController = async (req: Request, res: Response) => {
  const route = await createRouteService(
    req.body,
    req.params.dump_id,
    req.user.id,
  )

  return res.status(201).json(route)
}

export const updateRouteController = async (req: Request, res: Response) => {
  const route = await updateRouteService(req.body, req.params.route_id)

  return res.json(route)
}

export const createReserveController = async (req: Request, res: Response) => {
  const reserve = await createReserveService(req.params.dump_id, req.user.id)

  return res.status(201).json(reserve)
}

export const createCollectionController = async (
  req: Request,
  res: Response,
) => {
  const collection = await createCollectionService(
    req.body,
    req.params.dump_id,
    req.user.id,
  )

  return res.status(201).json(collection)
}

export const updateCollectionController = async (
  req: Request,
  res: Response,
) => {
  const collection = await updateCollectionService(
    req.body,
    req.params.collection_id,
  )

  return res.json(collection)
}
