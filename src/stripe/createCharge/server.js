import stripe from '../server'

const server = options => stripe.charges.create(options)

export default server
