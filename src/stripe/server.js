import stripeServer from 'stripe'
import createCharge from './createCharge'

const server = secret => {
  const stripe = stripeServer(secret)

  return ({ createCharge: createCharge(stripe) })
}

export default server
