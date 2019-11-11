import React, { useState } from 'react'
import fetch from 'unfetch'
import apiTestKeys from '../../../src/stripe/apiTestKeys'
import brandLogo from '../../../src/brandLogo'
import exampleCharge from './exampleCharge'
import PureExampleCard from './PureExampleCard'
import useStripeElements from '../useElements'
import useStyles from './useStyles'

const { publishable: publishableKey } = apiTestKeys
const useElements = useStripeElements(publishableKey)

const ExampleCard = ({ stripe }) => {
  const [stripeCard, handleStripeCardChange] = useState({})
  const { brand } = stripeCard
  const image = brandLogo(brand)

  const [element, handleCardElementReady] = useState(null)
  const elementLoaded = !!element

  // TODO: Implement
  const [, setToken] = useState({})
  const [, setChargeResponse] = useState({})
  const [, setCharge] = useState({})

  const handleSubmit = async () => {
    const token = await stripe.createToken({ name: 'Name' })
    setToken(token)

    const {
      token: {
        id: source
      }
    } = token || {}

    const chargeResponse = await fetch(
      '/api/createCharge',
      {
        body: JSON.stringify({ source, ...exampleCharge }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    setChargeResponse(chargeResponse)

    const charge = await chargeResponse.json()
    setCharge(charge)
  }

  return (
    <PureExampleCard
      {...{
        elementLoaded,
        handleCardElementReady,
        handleStripeCardChange,
        handleSubmit,
        image,
        stripeCard,
        classes: useStyles({ brand })
      }}
    />
  )
}

export default useElements(ExampleCard)
