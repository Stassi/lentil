import Stripe from 'stripe'
import createCharge from './createCharge'

const server = secret => {
  const stripe = Stripe(secret)
  return ({ createCharge: createCharge(stripe) })
}

export default server
