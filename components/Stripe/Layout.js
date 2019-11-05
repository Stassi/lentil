import React from 'react'
import { Elements } from 'react-stripe-elements'
import Typography from '@material-ui/core/Typography'
import CheckoutForm from './CheckoutForm'
import StripeContainer from './Container'

const Layout = () => (
  <StripeContainer>
    {stripe => (
      <>
        <Typography component='h1' variant='h5'>
          React Stripe Elements Example
        </Typography>
        <Elements>
          <CheckoutForm {...{ stripe }} />
        </Elements>
      </>
    )}
  </StripeContainer>
)

export default Layout
