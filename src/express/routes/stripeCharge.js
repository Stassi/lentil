// TODO: Generalize
const stripeCharge = createCharge => async (req, res) => {
  try {
    const charge = await createCharge(req.body)
    res.json(charge)
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

export default stripeCharge
