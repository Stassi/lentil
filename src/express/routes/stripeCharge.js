const stripeCharge = ({ createCharge, ...props }) => (req, res) => {
  try {
    // TODO: Replace param props with body props
    const { tokenId: source } = req.body
    const { status } = createCharge({ source, ...props })
    res.json({ status })
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export default stripeCharge
