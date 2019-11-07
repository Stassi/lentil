import bodyParser from 'body-parser'
import { stripeCharge } from './routes'
import socketListener from './socketListener'

const serve = ({
  defaultRouteHandler,
  port,
  express: server,
  stripe: {
    createCharge: createStripeCharge
  }
}) => {
  server.use(bodyParser.text())

  server.post('/api/charge', stripeCharge(createStripeCharge))

  server.all('*', defaultRouteHandler)

  server.listen(port, socketListener(port))
}

export default serve
