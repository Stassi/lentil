import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import useStripe from './useStripe'

const useApp = ({ Component, ...pageProps }) => {
  const initialState = {
    nullifyStyles: true,
    themeObject: {},
    titleText: 'App'
  }

  const [
    {
      nullifyStyles,
      themeObject,
      titleText
    },
    dispatch
  ] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setTheme') return { ...prevState, themeObject: action.theme }
    if (action.type === 'setTitle') return { ...prevState, titleText: action.title }
    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => dispatch({ type: 'reset' })
  }, [])

  const theme = useMemo(
    () => createMuiTheme(themeObject),
    [themeObject]
  )

  // TODO: Retrieve StripeJS instance as { stripe }
  const { client: stripeClient, script: stripeScript } = useStripe()

  useEffect(() => {
    // TODO: Remove
    console.log({ stripeClient, stripeScript })
  }, [stripeClient, stripeScript])

  return (
    <>
      <Head>
        <title>
          {titleText}
        </title>
      </Head>

      <ThemeProvider {...{ theme }}>
        {nullifyStyles ? <CssBaseline /> : null}
        <Component
          {...{
            stripeClient,
            stripeScript,
            theme,
            themeObject,
            titleText,
            setTheme: theme => dispatch({ theme, type: 'setTheme' }),
            setTitle: title => dispatch({ title, type: 'setTitle' }),
            ...pageProps
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default useApp
