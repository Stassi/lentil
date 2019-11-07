import express from 'express'
import next from 'next'
import stripe from 'stripe'
import configuration from './configuration'
import serveExpress from './express/serve'
import serveNextJs from './nextJs/serve'

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
  onReady: serveExpress,
  stripe: stripe(stripeSecret)
})
