import React, { useState } from 'react'
import { CardElement } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import configuration from '../../src/configuration'
import CardDebugger from './CardDebugger'
import ExpandableCard from '../ExpandableCard'
import useElements from './useElements'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const {
  stripeApiTestKeys: {
    publishable: apiKey
  }
} = configuration

const CheckoutForm = ({ stripe }) => {
  const { button: buttonClass } = useStyles()

  const [purchaseComplete, setPurchaseComplete] = useState(false)

  const [purchasingEnabled, setPurchasingEnabled] = useState(true)
  const disablePurchasing = () => setPurchasingEnabled(false)

  const [stripeCard, handleStripeCardChange] = useState({})

  const handleSubmit = async () => {
    disablePurchasing()

    const {
      token: {
        id: tokenId
      }
    } = await stripe.createToken({ name: 'Name' })

    const response = await window.fetch(
      '/api/charge/example',
      {
        body: JSON.stringify({ tokenId }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    if (response.ok) setPurchaseComplete(true)
  }

  return purchaseComplete ? (
    <h1>
      Purchase Complete
    </h1>
  ) : (
    <Container maxWidth='sm'>
      <ExpandableCard
        BodyContent={(
          <>
            <Typography
              component='h2'
              gutterBottom
              variant='h5'
            >
              React Stripe Elements Example
            </Typography>
            <Typography
              color='textSecondary'
              component='p'
              gutterBottom
              variant='body2'
            >
              Would you like to complete the purchase?
            </Typography>
            <CardElement onChange={handleStripeCardChange} />
          </>
        )}
        CollapsibleContent={<CardDebugger {...{ stripeCard }} />}
        PrimaryButton={(
          <Button
            color='primary'
            className={buttonClass}
            disabled={!purchasingEnabled}
            onClick={handleSubmit}
            variant='contained'
          >
            Purchase
          </Button>
        )}
      />
    </Container>
  )
}

export default useElements(apiKey)(CheckoutForm)
