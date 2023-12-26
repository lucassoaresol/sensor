import { AppError } from '../../errors'
import { ICreateRouteRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createRouteService = async (
  { date, lat, lon, month, year }: ICreateRouteRequest,
  dump_id: string,
  user_id: string,
) => {
  const dateData = date.split('/')
  const date_time = new Date(`${dateData[2]}-${dateData[1]}-${dateData[0]}`)

  const [monthData, yearData] = await Promise.all([
    prisma.month.findUnique({ where: { name: month } }),
    prisma.year.findUnique({ where: { year: String(year) } }),
  ])

  if (!monthData || !yearData) throw new AppError('')

  const route = await prisma.route.create({
    data: {
      lat,
      lon,
      date,
      date_time,
      dump_id: +dump_id,
      user_id: +user_id,
      month_id: monthData.id,
      year_id: yearData.id,
    },
  })

  return route
}
