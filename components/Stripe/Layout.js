import React from 'react'
import { Elements } from 'react-stripe-elements'
import MaterialContainer from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CheckoutForm from './CheckoutForm'
import StripeContainer from './Container'

const Layout = () => (
  <MaterialContainer maxWidth='sm'>
    <Typography component='h1' variant='h5'>
      React Stripe Elements Example
    </Typography>
    <StripeContainer>
      {stripe => (
        <Elements>
          <CheckoutForm {...{ stripe }} />
        </Elements>
      )}
    </StripeContainer>
  </MaterialContainer>
)

export default Layout
