import React, { useState } from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false)

  const handleSubmit = async () => {
    const { token } = await stripe.createToken({ name: 'Name' })
    const response = await window.fetch('/api/charge', {
      body: token.id,
      headers: { 'Content-Type': 'text/plain' },
      method: 'POST'
    })

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
