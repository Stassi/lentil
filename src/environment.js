import configuration from './configuration'

const {
  env: {
    NODE_ENV: nodeEnv,
    PORT: portString
  }
} = process

const { defaultPort } = configuration
const port = Number(portString) || defaultPort

const production = nodeEnv === 'production'

const environment = {
  port,
  production,
  development: !production
}

export default environment
