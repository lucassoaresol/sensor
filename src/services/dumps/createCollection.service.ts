import { AppError } from '../../errors'
import { ICreateCollectionRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createCollectionService = async (
  { date, month, year }: ICreateCollectionRequest,
  dump_id: string,
  user_id: string,
) => {
  const dateData = date.split('/')
  const date_time = new Date(`${dateData[2]}-${dateData[1]}-${dateData[0]}`)

  const [monthData, yearData, reserve] = await Promise.all([
    prisma.month.findUnique({ where: { name: month } }),
    prisma.year.findUnique({ where: { year: String(year) } }),
    prisma.reserve.findUnique({
      where: { dump_id: +dump_id },
    }),
  ])

  if (!monthData || !yearData) throw new AppError('')

  if (reserve) await prisma.reserve.delete({ where: { id: reserve.id } })

  const collection = await prisma.collection.create({
    data: {
      date,
      date_time,
      dump_id: +dump_id,
      user_id: +user_id,
      month_id: monthData.id,
      year_id: yearData.id,
    },
  })

  return collection
}
