const stripeCharge = ({ createCharge, ...props }) => (req, res) => {
  try {
    const { status } = createCharge({
      source: req.body,
      ...props
    })

    res.json({ status })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export default stripeCharge
