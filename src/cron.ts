import { CronJob } from 'cron'
import { createReadAllService } from './services'

const job = new CronJob('* 30 * * * *', async () => {
  try {
    await createReadAllService()
    console.log('leituras realizadas com sucesso')
  } catch (error) {
    console.error('Erro ao realizar leituras:', error)
  }
})

export default job
