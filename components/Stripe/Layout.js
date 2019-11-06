import React from 'react'
import MaterialContainer from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CheckoutForm from './CheckoutForm'
import StripeElements from './Elements'

const Layout = () => (
  <MaterialContainer maxWidth='sm'>
    <Typography component='h1' variant='h5'>
      React Stripe Elements Example
    </Typography>
    <StripeElements>
      {stripe => (
        <CheckoutForm {...{ stripe }} />
      )}
    </StripeElements>
  </MaterialContainer>
)

export default Layout
