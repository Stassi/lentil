import React from 'react'
import { Elements } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'
import StripeContainer from './Container'

const Layout = () => (
  <StripeContainer>
    {stripe => (
      <>
        <h1>React Stripe Elements Example</h1>
        <Elements>
          <CheckoutForm {...{ stripe }} />
        </Elements>
      </>
    )}
  </StripeContainer>
)

export default Layout
