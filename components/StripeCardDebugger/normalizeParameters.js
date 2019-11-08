import React from 'react'

// TODO: Set EnhancedComponent.displayName
const normalizeParameters = Component => ({
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
}) => {
  return (
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
}

export default normalizeParameters
