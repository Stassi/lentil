import Stripe from 'stripe'
import createCharge from './createCharge'
import exampleCharge from './exampleCharge'

const server = secret => {
  const stripe = Stripe(secret)

  return ({
    exampleCharge,
    createCharge: createCharge(stripe)
  })
}

export default server
