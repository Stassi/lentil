const createCharge = stripe => async options => stripe.charges.create(options)

export default createCharge
