import Stripe from 'stripe'
import apiTestKeys from './apiTestKeys'

const { secret: secretKey } = apiTestKeys

const stripe = Stripe(secretKey)

export default stripe
