import { prisma } from '../../lib'

export const listDumpService = async () => {
  const dumps = await prisma.dump.findMany()

  return dumps
}
