import React, { useMemo } from 'react'
import { Elements, injectStripe } from 'react-stripe-elements'

const useElements = () => {
  const ElementsGroup = useMemo(() => injectStripe(
    ({ children }) => <div>{children}</div>
  ) || null, [injectStripe])

  return useMemo(() => ({ children }) => (
    <Elements>
      <ElementsGroup>
        {children}
      </ElementsGroup>
    </Elements>
  ), [Elements, ElementsGroup])
}

export default useElements
