import bodyParser from 'body-parser'
import { stripeCharge } from './routes'
import socketListener from './socketListener'

const serve = ({
  defaultRouteHandler,
  port,
  stripe,
  express: server
}) => {
  server.use(bodyParser.text())

  server.post('/api/charge', stripeCharge(stripe))

  server.all('*', defaultRouteHandler)

  server.listen(port, socketListener(port))
}

export default serve
