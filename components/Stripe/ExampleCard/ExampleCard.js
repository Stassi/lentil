import React, {
  useEffect,
  useState
} from 'react'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import brandLogo from '../../../src/brandLogo'
import createCharge from '../../../src/stripe/createCharge/client'
import exampleCharge from '../../../src/stripe/exampleCharge'
import useElements from '../../../src/stripe/useElements'
import PureExampleCard from './PureExampleCard'
import useStyles from './useStyles'
import stateNames from './state'

const state = stateFromPairs(stateNames)

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
    (async () => {
      if (purchaseRequested) {
        // TODO: Set token conditionally, implement error handling
        setToken(await stripe.createToken({ name: 'Name' }))
      }
    })()
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
      handleSubmit={(ev) => {
        ev.preventDefault()
        setPurchaseRequested(true)
      }}
      image={brandLogo(brand)}
    />
  )
}

export default useElements(ExampleCard)
