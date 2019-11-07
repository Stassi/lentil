import React, { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Typography } from '@material-ui/core'

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false)

  const handleSubmit = async () => {
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
      <CardElement />
      <button onClick={handleSubmit}>
        Purchase
      </button>
    </>
  )
}

export default injectStripe(CheckoutForm)
