import React, { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

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
      <p>
        Would you like to complete the purchase?
      </p>
      <CardElement />
      <button onClick={handleSubmit}>
        Purchase
      </button>
    </>
  )
}

export default injectStripe(CheckoutForm)
