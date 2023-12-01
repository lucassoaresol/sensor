import { prisma } from '../../lib'

export const createReadAllService = async () => {
  const dumps = await prisma.dump.findMany({ where: { is_active: true } })

  for (const dump of dumps) {
    const value =
      Math.floor(Math.random() * (dump.cap - dump.value + 1)) + dump.value
    await Promise.all([
      prisma.read.create({ data: { dump_id: dump.id, value } }),
      prisma.dump.update({ where: { id: dump.id }, data: { value } }),
    ])
  }
}
