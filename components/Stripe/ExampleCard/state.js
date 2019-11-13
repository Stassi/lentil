const state = ([prev, setState]) => ({
  ...prev,
  setCharge: charge => setState({ ...prev, charge }),
  setChargeRequest: chargeRequest => setState({ ...prev, chargeRequest }),
  setChargeResponse: chargeResponse => setState({ ...prev, chargeResponse }),
  setElement: element => setState({ ...prev, element }),
  setPurchaseRequested: purchaseRequested => setState({ ...prev, purchaseRequested }),
  setStripeCard: stripeCard => setState({ ...prev, stripeCard }),
  setToken: token => setState({ ...prev, token })
})

export default state
