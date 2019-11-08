import React, {
  useEffect,
  useState
} from 'react'
import {
  Elements,
  injectStripe,
  StripeProvider
} from 'react-stripe-elements'
import getDisplayName from '../../src/utility/getDisplayName'

const enhance = ({ apiKey, Component }) => ({ ...props }) => {
  const [stripe, setStripe] = useState(null)

  useEffect(() => { setStripe(window.Stripe(apiKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      <Elements>
        <Component {...props} />
      </Elements>
    </StripeProvider>
  )
}

const useElements = apiKey => Component => {
  const StripeInjectedComponent = injectStripe(Component)
  const [EnhancedComponent, targetName] = [
    enhance({ apiKey, Component: StripeInjectedComponent }),
    getDisplayName(StripeInjectedComponent)
  ]
  EnhancedComponent.displayName = `WithStripeElements(${targetName})`
  return EnhancedComponent
}

export default useElements
