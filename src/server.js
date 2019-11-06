import bodyParser from 'body-parser'
import express from 'express'
import proxy from 'http-proxy-middleware'
import next from 'next'
import Stripe from 'stripe'
import apiTestKeys from './apiTestKeys'

const env = process.env.NODE_ENV
const dev = env !== 'production'
const app = next({ dev, dir: '.' })
const handle = app.getRequestHandler()

const stripe = Stripe(apiTestKeys.secret)

const loadServer = () => {
  const server = express()

  server.use(bodyParser.text())

  if (dev) {
    server.use(
      '/api',
      proxy({
        changeOrigin: true,
        pathRewrite: { '^/api': '/' },
        target: 'http://localhost:9000/api/'
      })
    )
  }

  server.post('/charge', async (req, res) => {
    try {
      const { status } = await stripe.charges.create({
        amount: 2000,
        currency: 'usd',
        description: 'An example charge',
        logLevel: 'debug',
        source: req.body
      })

      res.json({ status })
    } catch (err) {
      console.log(err)
      res.status(500).end()
    }
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(9000, () => console.log('Listening on port 9000'))
}

app
  .prepare()
  .then(loadServer)
