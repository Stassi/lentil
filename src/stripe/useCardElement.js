import React, {
  useEffect,
  useState
} from 'react'
import { CardElement as StripeCardElement } from 'react-stripe-elements'

const useCardElement = ({ focus }) => {
  const [Component, setComponent] = useState(null)
  const [element, setElement] = useState(null)
  const [stripeCard, setStripeCard] = useState({})

  useEffect(() => {
    setComponent(
      <StripeCardElement
        onChange={setStripeCard}
        onReady={setElement}
      />
    )
  }, [])

  useEffect(() => {
    if (focus && element) element.focus()
  }, [element])

  return {
    Component,
    stripeCard,
    loaded: !!element
  }
}

export default useCardElement
