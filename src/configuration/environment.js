import settings from './settings'

const {
  env: {
    NODE_ENV: nodeEnv,
    PORT: portString
  }
} = process || {}

const { defaultPort } = settings
const port = Number(portString) || defaultPort

const production = nodeEnv === 'production'

const environment = {
  port,
  production,
  development: !production
}

export default environment
