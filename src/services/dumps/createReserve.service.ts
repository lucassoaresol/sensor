import dayjs from 'dayjs'
import { AppError } from '../../errors'
import { prisma } from '../../lib'

export const createReserveService = async (
  dump_id: string,
  user_id: string,
) => {
  const reserveData = await prisma.reserve.findUnique({
    where: { dump_id: +dump_id },
  })

  if (reserveData) {
    if (dayjs().diff(reserveData.created_at, 'minute') > 5) {
      await prisma.reserve.delete({ where: { id: reserveData.id } })
    } else throw new AppError('reserve already exists', 409)
  }

  const reserve = await prisma.reserve.create({
    data: {
      dump_id: +dump_id,
      user_id: +user_id,
    },
  })

  return reserve
}
