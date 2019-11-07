const stripeCharge = createCharge => (req, res) => {
  try {
    const { status } = createCharge({
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
