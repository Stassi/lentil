import React, {
  useEffect,
  useState
} from 'react'
import {
  StripeProvider,
  Elements as StripeElements
} from 'react-stripe-elements'

const Elements = ({ apiKey, children }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => { setStripe(window.Stripe(apiKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      <StripeElements>
        {children(stripe)}
      </StripeElements>
    </StripeProvider>
  )
}

export default Elements
