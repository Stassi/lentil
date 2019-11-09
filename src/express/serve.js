import bodyParser from 'body-parser'
import { stripeCharge } from './routes'

const serve = ({
  defaultRouteHandler,
  listeningMessage,
  port,
  express: server,
  stripe: { createCharge }
}) => {
  server.use(bodyParser.json())

  server.post(
    '/api/charge',
    stripeCharge(createCharge)
  )

  server.all('*', defaultRouteHandler)

  server.listen(
    port,
    err => {
      if (err) throw err
      console.log(listeningMessage)
    }
  )
}

export default serve
