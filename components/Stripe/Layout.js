import React from 'react'
import MaterialContainer from '@material-ui/core/Container'
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
    <StripeElements {...{ apiKey }}>
      <CheckoutForm />
    </StripeElements>
  </MaterialContainer>
)

export default Layout
