import { ICollectionUpdateRequest } from '../../interfaces'
import { prisma } from '../../lib'

export const updateCollectionService = async (
  { status, value }: ICollectionUpdateRequest,
  id: string,
) => {
  const collection = await prisma.collection.update({
    data: { value, status, finished_at: new Date() },
    where: { id },
  })

  if (value) {
    const dump_id = collection.dump_id
    await Promise.all([
      prisma.read.create({ data: { value: 0, dump_id } }),
      prisma.dump.update({ where: { id: dump_id }, data: { value: 0 } }),
    ])
  }

  return collection
}
