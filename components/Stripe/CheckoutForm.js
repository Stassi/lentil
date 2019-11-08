import React, { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import StripeCardDebugger from '../StripeCardDebugger'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

const CheckoutForm = ({ stripe }) => {
  const { button: buttonClass } = useStyles()

  const [complete, setComplete] = useState(false)

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

    if (response.ok) setComplete(true)
  }

  return complete ? (
    <h1>
      Purchase Complete
    </h1>
  ) : (
    <>
      <Typography gutterBottom variant='body2'>
        Would you like to complete the purchase?
      </Typography>
      <CardElement onChange={handleStripeCardChange} />
      <Button
        color='primary'
        className={buttonClass}
        disabled={!purchasingEnabled}
        onClick={handleSubmit}
        variant='contained'
      >
        Purchase
      </Button>
      <StripeCardDebugger {...{ stripeCard }} />
    </>
  )
}

export default injectStripe(CheckoutForm)
