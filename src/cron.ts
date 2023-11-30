import { CronJob } from 'cron'
import { prisma } from './lib'

const findDump = async () => {
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

const job = new CronJob('* 30 * * * *', async () => {
  try {
    await findDump()
    console.log('Status das postagens atualizado com sucesso')
  } catch (error) {
    console.error('Erro ao atualizar o status das postagens:', error)
  }
})

export default job
