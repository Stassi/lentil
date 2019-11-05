import React, {
  useEffect,
  useState
} from 'react'
import { StripeProvider } from 'react-stripe-elements'
import stripeAPIKey from '../../src/stripeAPIKey'

const Container = ({ children }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => { setStripe(window.Stripe(stripeAPIKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      {children(stripe)}
    </StripeProvider>
  )
}

export default Container
