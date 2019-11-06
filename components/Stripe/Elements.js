import React, {
  useEffect,
  useState
} from 'react'
import {
  StripeProvider,
  Elements as StripeElements
} from 'react-stripe-elements'
import stripeAPIKey from '../../src/stripeAPIKey'

const Elements = ({ children }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => { setStripe(window.Stripe(stripeAPIKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      <StripeElements>
        {children(stripe)}
      </StripeElements>
    </StripeProvider>
  )
}

export default Elements
