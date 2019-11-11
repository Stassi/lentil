import stripe from './stripe'

const createCharge = options => stripe.charges.create(options)

export default createCharge
