import { IRouteUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const updateRouteService = async (
  { status }: IRouteUpdateRequest,
  id: string,
) => {
  const route = await prisma.route.update({
    data: { status, finished_at: new Date() },
    where: { id },
  })

  return route
}
