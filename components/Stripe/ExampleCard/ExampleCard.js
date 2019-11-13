import React, {
  useEffect,
  useState
} from 'react'
import brandLogo from '../../../src/brandLogo'
import createCharge from '../../../src/stripe/createCharge/client'
import exampleCharge from '../../../src/stripe/exampleCharge'
import useElements from '../../../src/stripe/useElements'
import PureExampleCard from './PureExampleCard'
import state from './state'
import useStyles from './useStyles'

const ExampleCard = ({ stripe }) => {
  const {
    charge,
    chargeRequest,
    chargeResponse,
    element,
    purchaseRequested,
    setCharge,
    setChargeRequest,
    setChargeResponse,
    setPurchaseRequested,
    setToken,
    stripeCard,
    stripeCard: {
      brand
    } = {},
    token: {
      token: {
        id: tokenId
      } = {}
    } = {},
    ...otherState
  } = state(useState({}))

  useEffect(() => {
    // TODO: Implement
    if (charge) console.log({ charge })
  }, [charge])

  useEffect(() => {
    (async () => {
      if (chargeRequest) setChargeResponse(await createCharge(chargeRequest))
    })()
  }, [chargeRequest])

  useEffect(() => {
    (async () => {
      if (chargeResponse) setCharge(await chargeResponse.json())
    })()
  }, [chargeResponse])

  useEffect(() => {
    if (element) element.focus()
  }, [element])

  useEffect(() => {
    if (purchaseRequested) {
      // TODO: Implement
      console.log({ purchaseRequested })
    }
  }, [purchaseRequested])

  useEffect(() => {
    if (tokenId) setChargeRequest({ source: tokenId, ...exampleCharge })
  }, [tokenId])

  return (
    <PureExampleCard
      {...{ ...otherState, stripeCard }}
      // TODO: Implement
      animatePurchaseLoading={false}
      classes={useStyles({ brand })}
      elementLoaded={!!element}
      handleSubmit={async (ev) => {
        ev.preventDefault()
        setPurchaseRequested(true)
        setToken(await stripe.createToken({ name: 'Name' }))
      }}
      image={brandLogo(brand)}
    />
  )
}

export default useElements(ExampleCard)
