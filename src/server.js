import express from 'express'
import next from 'next'
import stripe from 'stripe'
import apiTestKeys from './apiTestKeys'
import environment from './environment'
import serveExpress from './express/serve'
import serveNextJs from './nextJs/serve'

const {
  port,
  development: dev
} = environment

const { secret } = apiTestKeys

serveNextJs({
  port,
  app: next({ dev }),
  express: express(),
  onReady: serveExpress,
  stripe: stripe(secret)
})
