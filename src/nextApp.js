import next from 'next'
import environment from './environment'

const { development: dev } = environment

const nextApp = next({ dev })

export default nextApp
