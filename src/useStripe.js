import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import { StripeProvider } from 'react-stripe-elements'
import appendClientScriptToBody from './stripe/appendClientScriptToBody'

const useStripe = ({ options, publishableKey }) => {
  const initialState = {
    client: null,
    metricsController: null,
    script: null
  }

  const [{
    client,
    metricsController,
    script
  }, dispatch] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setClient') return { ...prevState, client: action.client }
    if (action.type === 'setMetricsController') {
      return { ...prevState, metricsController: action.metricsController }
    }
    if (action.type === 'setScript') return { ...prevState, script: action.script }
    throw new Error()
  }, initialState)

  useEffect(() => {
    dispatch({
      metricsController: document.querySelector(
        'body > iframe[src^="https://js.stripe.com/v2/m/outer.html"]'
      ),
      type: 'setMetricsController'
    })

    dispatch({
      script: document.querySelector('script[src^="https://js.stripe.com/v3/"') ||
        appendClientScriptToBody({
          document,
          onload: () => dispatch({ client: window.Stripe, type: 'setClient' })
        }),
      type: 'setScript'
    })

    return () => dispatch({ type: 'reset' })
  }, [])

  useEffect(() => {
    dispatch({ client: window.Stripe, type: 'setClient' })
  }, [metricsController])

  const instance = useMemo(
    () => client
      ? client(publishableKey, options)
      : null,
    [
      client,
      publishableKey,
      options
    ]
  )

  return {
    client,
    instance,
    metricsController,
    script,
    Provider: ({ children }) => (
      <StripeProvider {...{ stripe: instance }}>
        {children}
      </StripeProvider>
    )
  }
}

export default useStripe
