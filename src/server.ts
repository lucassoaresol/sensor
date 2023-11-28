import app from './app'
import { env } from './env'
import job from './cron'

app.listen(env.PORT, () => {
  console.log(`Servidor executando na porta ${env.PORT}.`)
  job.start()
})
