import React from 'react'
import MaterialContainer from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CheckoutForm from './CheckoutForm'
import StripeElements from './Elements'
import apiKey from '../../src/apiTestKeys'

const Layout = () => (
  <MaterialContainer maxWidth='sm'>
    <Typography component='h1' variant='h5'>
      React Stripe Elements Example
    </Typography>
    <StripeElements apiKey={apiKey.publishable}>
      <CheckoutForm />
    </StripeElements>
  </MaterialContainer>
)

export default Layout
