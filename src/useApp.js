import React, { useState } from 'react'
import Head from 'next/head'
import { Elements } from 'react-stripe-elements'
import CssBaseline from '@material-ui/core/CssBaseline'
import apiTestKeys from '../src/stripe/apiTestKeys'
import useMuiTheme from './useMuiTheme'
import useStripe from './useStripe'

const { publishable: publishableKey } = apiTestKeys

const useApp = ({ Component, ...pageProps }) => {
  const [titleText, setTitle] = useState('lentil')

  const { Provider: ThemeProvider, ...themeProps } = useMuiTheme()

  const { Provider: StripeProvider, ...stripeProps } = useStripe({ publishableKey })

  return (
    <>
      <Head>
        <title>
          {titleText}
        </title>
      </Head>

      <ThemeProvider>
        <CssBaseline />

        <StripeProvider>
          <Elements>
            <Component
              {...{
                setTitle,
                titleText,
                ...stripeProps,
                ...themeProps,
                ...pageProps
              }}
            />
          </Elements>
        </StripeProvider>
      </ThemeProvider>
    </>
  )
}

export default useApp
