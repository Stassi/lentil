import React, {
  useEffect,
  useState
} from 'react'
import {
  Elements,
  injectStripe,
  StripeProvider
} from 'react-stripe-elements'
import apiTestKeys from './apiTestKeys'
import getDisplayName from '../utility/getDisplayName'

const { publishable: apiKey } = apiTestKeys

const enhance = Component => props => {
  const [stripe, setStripe] = useState(null)

  // TODO: Load script asynchronously
  useEffect(() => { setStripe(window.Stripe(apiKey)) }, [])

  return (
    <StripeProvider {...{ stripe }}>
      <Elements>
        <Component {...props} />
      </Elements>
    </StripeProvider>
  )
}

const useElements = Component => {
  const StripeInjectedComponent = injectStripe(Component)
  const [EnhancedComponent, targetName] = [
    enhance(StripeInjectedComponent),
    getDisplayName(StripeInjectedComponent)
  ]
  EnhancedComponent.displayName = `WithStripeElements(${targetName})`
  return EnhancedComponent
}

export default useElements
