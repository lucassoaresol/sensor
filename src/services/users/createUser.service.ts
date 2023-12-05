import { hashSync } from 'bcryptjs'
import { AppError } from '../../errors'
import { ICreateUserRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createUserService = async ({
  email,
  name,
  password,
  phone,
  role,
}: ICreateUserRequest) => {
  const userData = await prisma.user.findUnique({
    where: { email },
  })

  if (userData) throw new AppError('user already exists', 409)

  password = hashSync(password, 10)

  const user = await prisma.user.create({
    data: { email, name, password, phone, role },
  })

  return user
}
