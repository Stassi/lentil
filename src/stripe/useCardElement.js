import React, { useEffect, useState } from 'react'
import { CardElement as StripeCardElement } from 'react-stripe-elements'

const useCardElement = ({ focus = true } = {}) => {
  const [Component, setComponent] = useState(null)
  const [element, onReady] = useState(null)
  const [stripeCard, onChange] = useState({})

  const { empty, error } = stripeCard

  useEffect(() => {
    setComponent(<StripeCardElement {...{ onChange, onReady }} />)
  }, [])

  useEffect(() => {
    if (focus && element) element.focus()
  }, [element])

  return {
    Component,
    stripeCard,
    loaded: !!element,
    validInput: !(empty || error)
  }
}

export default useCardElement
