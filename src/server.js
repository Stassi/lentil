import express from 'express'
import next from 'next'
import configuration from './configuration'
import serveExpress from './express/serve'
import serveNextJs from './nextJs/serve'
import stripe from './stripe'

const {
  port,
  development: dev,
  stripeApiTestKeys: {
    secret: stripeSecret
  }
} = configuration

serveNextJs({
  port,
  app: next({ dev }),
  express: express(),
  listeningMessage: `[ server ] Ready on http://localhost:${port}`,
  onReady: serveExpress,
  stripe: stripe(stripeSecret)
})
