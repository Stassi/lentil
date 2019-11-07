import bodyParser from 'body-parser'
import {
  nextJsRequest,
  socketListener,
  stripeCharge
} from './handlers'

const serve = ({
  port,
  stripe,
  app: nextApp,
  express: server
}) => {
  server.use(bodyParser.text())

  server.post('/api/charge', stripeCharge(stripe))

  server.all('*', nextJsRequest(nextApp))

  server.listen(port, socketListener(port))
}

export default serve
