import { prisma } from '../../lib'

export const profileUserService = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: +id },
  })

  return user
}
