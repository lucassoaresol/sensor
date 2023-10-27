import { ICreateReadRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createReadService = async (
  { value }: ICreateReadRequest,
  dump_id: string,
) => {
  const read = await prisma.read.create({ data: { value, dump_id } })

  return read
}
