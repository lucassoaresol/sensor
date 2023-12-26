import { Request, Response } from 'express'
import {
  createUserService,
  listUserService,
  profileUserService,
} from '../services'

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body)

  return res.status(201).json(user)
}

export const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService()

  return res.json(users)
}

export const profileUserController = async (req: Request, res: Response) => {
  const user = await profileUserService(req.user.id, req.query)

  return res.json(user)
}
