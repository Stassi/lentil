import React from 'react'
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
        <CheckoutForm {...{ stripe }} />
      )}
    </StripeContainer>
  </MaterialContainer>
)

export default Layout
