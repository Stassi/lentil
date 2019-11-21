import React from 'react'
import { Elements, injectStripe } from 'react-stripe-elements'

const useElements = () => {
  const ElementsGroup = injectStripe(({ children }) => <div>{children}</div>)

  return ({
    Component: ({ children }) => (
      <Elements>
        <ElementsGroup>
          {children}
        </ElementsGroup>
      </Elements>
    )
  })
}

export default useElements
