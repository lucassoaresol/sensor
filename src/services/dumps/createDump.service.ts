import { ICreateDumpRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const createDumpService = async ({ name }: ICreateDumpRequest) => {
  const dump = await prisma.dump.create({ data: { name } })

  return dump
}
