import { Request, Response } from 'express'
import { createUserService, listUserService } from '../services'

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body)

  return res.status(201).json(user)
}

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService()

  return res.json(users)
}
