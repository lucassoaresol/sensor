import dayjs from 'dayjs'
import { getDistance } from 'geolib'
import { IDumpQuery } from '../../interfaces'
import { prisma } from '../../lib'
import { listDumpService, updateRouteService } from '../dumps'
import { DumpReturnSchema } from '../../schemas'

export const profileUserService = async (
  id: string,
  { lat, lon }: IDumpQuery,
) => {
  let dataReturn = {}

  const [user, route, reserve, collection] = await Promise.all([
    prisma.user.findUnique({
      where: { id: +id },
    }),
    prisma.route.findFirst({
      where: { user_id: +id, status: 'PROGRESS' },
      select: { id: true, created_at: true, dump: true },
    }),
    prisma.reserve.findUnique({
      where: { user_id: +id },
      select: { id: true, created_at: true, dump: true },
    }),
    prisma.collection.findFirst({
      where: { user_id: +id, status: 'PROGRESS' },
      select: { id: true, created_at: true, dump: true },
    }),
  ])

  dataReturn = { ...dataReturn, user }

  if (route) {
    if (dayjs().diff(route.created_at, 'h') > 1) {
      await updateRouteService({ status: 'CANCELED' }, route.id)
    } else {
      const dump = DumpReturnSchema.parse(route.dump)

      dataReturn = {
        ...dataReturn,
        route: { ...route, dump },
      }

      if (lat && lon) {
        const distance = getDistance({ lat, lon }, dump)

        dataReturn = {
          ...dataReturn,
          route: { ...route, dump: { ...dump, distance } },
        }
      }
    }
  }

  if (reserve) {
    if (dayjs().diff(reserve.created_at, 'minute') > 5) {
      await prisma.reserve.delete({ where: { id: reserve.id } })
    } else
      dataReturn = {
        ...dataReturn,
        reserve: { ...reserve, dump: DumpReturnSchema.parse(reserve.dump) },
      }
  }

  if (collection)
    dataReturn = {
      ...dataReturn,
      collection: {
        ...collection,
        dump: DumpReturnSchema.parse(collection.dump),
      },
    }

  if (lat && lon) {
    const next_dump: any[] = []
    const dumps = await listDumpService({ lat, lon })

    dumps.forEach((el) => {
      const distance = getDistance({ lat, lon }, el)
      if (distance <= 2000) {
        next_dump.push({ ...el, distance })
      }
    })

    const result = next_dump
      .filter((el) => el.prc > 70 && !el.is_collecting)
      .slice(0, 5)

    dataReturn = { ...dataReturn, next_dump: result }
  }

  return dataReturn
}
