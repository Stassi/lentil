import createCharge from '../../src/stripe/createCharge'

const CreateCharge = async (req, res) => {
  res.json(await createCharge(req.body))
}

export default CreateCharge
