import { orderByDistance } from 'geolib'
import { IDumpQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { DumpReturnArraySchema } from '../../schemas'

export const listDumpService = async ({ lat, lon, sector }: IDumpQuery) => {
  const dumps = await prisma.dump.findMany({
    where: { sector: { equals: sector, mode: 'insensitive' } },
    orderBy: { name: 'asc' },
    include: {
      routes: { where: { status: 'PROGRESS' }, select: { created_at: true } },
      reserve: { select: { created_at: true } },
      collections: {
        where: { status: 'PROGRESS' },
        select: { created_at: true },
      },
    },
  })

  const dumpsReturn = DumpReturnArraySchema.parse(dumps)

  if (lat && lon) return orderByDistance({ lat, lon }, dumpsReturn)

  return dumpsReturn
}
