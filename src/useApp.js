import React, {
  useEffect,
  useReducer
} from 'react'
import Head from 'next/head'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CssBaseline from '@material-ui/core/CssBaseline'
import apiTestKeys from '../src/stripe/apiTestKeys'
import useMuiTheme from './useMuiTheme'
import useStripe from './useStripe'

const { publishable: publishableKey } = apiTestKeys

const useApp = ({ Component, ...pageProps }) => {
  const initialState = { nullifyStyles: true, titleText: 'lentil' }

  const [{ nullifyStyles, titleText }, dispatch] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setTitle') return { ...prevState, titleText: action.title }
    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => dispatch({ type: 'reset' })
  }, [])

  const { Provider: ThemeProvider, ...themeProps } = useMuiTheme()

  const { instance: stripe, ...stripeProps } = useStripe({ publishableKey })

  return (
    <>
      <Head>
        <title>
          {titleText}
        </title>
      </Head>

      <ThemeProvider>
        {nullifyStyles ? <CssBaseline /> : null}

        <StripeProvider {...{ stripe }}>
          <Elements>
            <Component
              {...{
                stripe,
                titleText,
                ...stripeProps,
                ...themeProps,
                ...pageProps,
                setTitle: title => dispatch({ title, type: 'setTitle' })
              }}
            />
          </Elements>
        </StripeProvider>
      </ThemeProvider>
    </>
  )
}

export default useApp
