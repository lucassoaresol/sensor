import { prisma } from '../../lib'

export const listReadService = async () => {
  const reads = await prisma.read.findMany()

  return reads
}
