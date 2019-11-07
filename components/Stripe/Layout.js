import React from 'react'
import MaterialContainer from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CheckoutForm from './CheckoutForm'
import StripeElements from './Elements'
import configuration from '../../src/configuration'

const {
  stripeApiTestKeys: {
    publishable: apiKey
  }
} = configuration

const Layout = () => (
  <MaterialContainer maxWidth='sm'>
    <Typography
      component='h1'
      gutterBottom
      variant='h5'
    >
      React Stripe Elements Example
    </Typography>
    <StripeElements {...{ apiKey }}>
      <CheckoutForm />
    </StripeElements>
  </MaterialContainer>
)

export default Layout
