import { Request, Response } from 'express'
import { createDumpService, listDumpService } from '../services'

export const createDumpController = async (req: Request, res: Response) => {
  const dump = await createDumpService(req.body)

  return res.status(201).json(dump)
}

export const listDumpController = async (req: Request, res: Response) => {
  const dumps = await listDumpService(req.query)

  return res.json(dumps)
}
