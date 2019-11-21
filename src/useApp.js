import React, { useState } from 'react'
import Head from 'next/head'
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
          <Component
            {...{
              setTitle,
              titleText,
              ...stripeProps,
              ...themeProps,
              ...pageProps
            }}
          />
        </StripeProvider>
      </ThemeProvider>
    </>
  )
}

export default useApp
