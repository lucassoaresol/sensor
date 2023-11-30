import { prisma } from '../../lib'
import { DumpReturnArraySchema } from '../../schemas'

export const listDumpService = async () => {
  const dumps = await prisma.dump.findMany()

  return DumpReturnArraySchema.parse(dumps)
}
