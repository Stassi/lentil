import React, { useState } from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import apiTestKeys from '../src/stripe/apiTestKeys'
import useMuiTheme from './useMuiTheme'
import useStripe from './useStripe'

const { publishable: publishableKey } = apiTestKeys

const useApp = ({ Component, ...nextJs }) => {
  const [titleText, setTitle] = useState('lentil')

  const { Provider: ThemeProvider, ...theme } = useMuiTheme()

  const { Provider: StripeProvider, ...stripe } = useStripe({ publishableKey })

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
              nextJs,
              setTitle,
              stripe,
              theme,
              titleText
            }}
          />
        </StripeProvider>
      </ThemeProvider>
    </>
  )
}

export default useApp
