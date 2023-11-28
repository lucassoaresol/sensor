import { ICreateReadRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createReadService = async (
  { value }: ICreateReadRequest,
  dump_id_data: string,
) => {
  const dump_id = +dump_id_data
  const read = await prisma.read.create({ data: { value: +value, dump_id } })

  return read
}
