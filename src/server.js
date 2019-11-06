import bodyParser from 'body-parser'
import express from 'express'
import next from 'next'
import stripe from './stripeServer'

const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

const loadServer = () => {
  const server = express()

  server.use(bodyParser.text())

  server.post('/api/charge', async (req, res) => {
    try {
      const { status } = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        description: 'An example charge',
        source: req.body
      })

      res.json({ status })
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  })

  server.all('*', (req, res) => handle(req, res))

  server.listen(9000, () => console.log('Listening on port 9000'))
}

app
  .prepare()
  .then(loadServer)
