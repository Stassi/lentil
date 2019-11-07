import environment from './environment'
import settings from './settings'

const configuration = {
  ...settings,
  ...environment
}

export default configuration
