import nearbySort from 'nearby-sort'
import { IDumpQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { DumpReturnArraySchema } from '../../schemas'

export const listDumpService = async ({ lat, long }: IDumpQuery) => {
  const dumps = await prisma.dump.findMany({ orderBy: { name: 'asc' } })

  const dumpsReturn = DumpReturnArraySchema.parse(dumps)

  if (lat && long)
    return await nearbySort({ lat: +lat, long: +long }, dumpsReturn)

  return dumpsReturn
}
