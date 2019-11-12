import Stripe from 'stripe'
import apiTestKeys from './apiTestKeys'

const { secret: secretKey } = apiTestKeys

const server = Stripe(secretKey)

export default server
