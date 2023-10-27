import { Request, Response } from 'express'
import { createReadService, listReadService } from '../services'

export const createReadController = async (req: Request, res: Response) => {
  const read = await createReadService(req.body, req.params.dump_id)

  return res.status(201).json(read)
}

export const listReadController = async (req: Request, res: Response) => {
  const reads = await listReadService()

  return res.json(reads)
}
