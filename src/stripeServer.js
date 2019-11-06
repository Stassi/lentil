import Stripe from 'stripe'
import apiTestKeys from './apiTestKeys'

const stripeServer = Stripe(apiTestKeys.secret)

export default stripeServer
