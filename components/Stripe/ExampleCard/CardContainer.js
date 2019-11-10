import React, { useState } from 'react'
import brandLogo from '../../../src/brandLogo'
import configuration from '../../../src/configuration'
import exampleCharge from './exampleCharge'
import PureCard from './PureCard'
import useStripeElements from '../useElements'
import useStyles from './useStyles'

const {
  stripeApiTestKeys: {
    publishable: apiKey
  }
} = configuration
const useElements = useStripeElements(apiKey)

const CardContainer = ({ stripe }) => {
  const [stripeCard, handleStripeCardChange] = useState({})
  const { brand } = stripeCard
  const image = brandLogo(brand)

  const [element, handleCardElementReady] = useState(null)
  const elementLoaded = !!element

  // TODO: Implement
  const [, setToken] = useState({})
  const [, setResponse] = useState({})
  const [, setResponseBody] = useState({})

  const handleSubmit = async () => {
    const token = await stripe.createToken({ name: 'Name' })
    setToken(token)

    const {
      token: {
        id: source
      }
    } = token

    const response = await window.fetch(
      '/api/charge',
      {
        body: JSON.stringify({ source, ...exampleCharge }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    setResponse(response)

    if (response.ok) {
      const responseJson = await response.json()
      setResponseBody(responseJson)
    }
  }

  return (
    <PureCard
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

export default useElements(CardContainer)
