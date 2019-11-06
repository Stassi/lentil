import React, {
  useEffect,
  useState
} from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import stripeAPIKey from '../../src/stripeAPIKey'

const Container = ({ children }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => { setStripe(window.Stripe(stripeAPIKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      <Elements>
        {children(stripe)}
      </Elements>
    </StripeProvider>
  )
}

export default Container
