import React from 'react'
import getDisplayName from '../../src/utility/getDisplayName'

const enhance = Component => ({
  stripeCard: {
    brand,
    complete: inputComplete = false,
    empty: inputEmpty = true,
    error: {
      code: errorCode,
      message: errorMessage,
      type: errorType
    } = {},
    value: { postalCode } = {}
  },
  ...props
}) => (
  <Component
    {...{
      brand,
      errorCode,
      errorMessage,
      errorType,
      inputComplete,
      inputEmpty,
      postalCode,
      ...props
    }}
  />
)

const normalizeStripeCard = Component => {
  const [EnhancedComponent, targetName] = [
    enhance(Component),
    getDisplayName(Component)
  ]
  EnhancedComponent.displayName = `WithNormalizedStripeCard(${targetName})`
  return EnhancedComponent
}

export default normalizeStripeCard
