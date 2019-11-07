import createCharge from '../../stripe/createCharge'

const stripeCharge = stripe => (req, res) => {
  try {
    // TODO: Parameterize createCharge
    const { status } = createCharge(stripe)({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({ status })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export default stripeCharge
