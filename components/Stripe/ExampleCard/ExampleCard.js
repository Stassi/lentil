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
    setCharge,
    setChargeRequest,
    setChargeResponse,
    setToken,
    stripeCard,
    token: {
      token: {
        id: source
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
    if (source) setChargeRequest({ source, ...exampleCharge })
  }, [source])

  const { brand } = stripeCard || {}

  return (
    <PureExampleCard
      {...{
        ...otherState,
        stripeCard,
        // TODO: Implement
        animatePurchaseLoading: false,
        classes: useStyles({ brand }),
        elementLoaded: !!element,
        image: brandLogo(brand),
        requestToken: async () => {
          setToken(await stripe.createToken({ name: 'Name' }))
        }
      }}
    />
  )
}

export default useElements(ExampleCard)
