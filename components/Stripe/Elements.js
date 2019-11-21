import React from 'react'
import { injectStripe, Elements as StripeElements } from 'react-stripe-elements'

const ElementsGroup = injectStripe(({ children }) => <div>{children}</div>)

const Elements = ({ children }) => (
  <StripeElements>
    <ElementsGroup>
      {children}
    </ElementsGroup>
  </StripeElements>
)

export default Elements
