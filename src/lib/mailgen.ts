import Mailgen from 'mailgen'
import { env } from '../env'

export const mailGenerator = new Mailgen({
  theme: 'cerberus',

  product: {
    // logo: "",
    name: 'Sensor',
    link: env.BASE_URL,
  },
})
