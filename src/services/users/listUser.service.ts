import { prisma } from '../../lib'

export const listUserService = async () => {
  const users = await prisma.user.findMany()

  return users
}
