import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import createScript from './utility/createScript'

const useApp = ({ Component, ...pageProps }) => {
  const initialState = {
    loadStripe: true,
    nullifyStyles: true,
    Page: ({ ...props }) => <Component {...{ ...props, ...pageProps }} />,
    stripeClient: null,
    stripeScript: null,
    themeObject: {},
    titleText: 'App',
    windowError: null
  }

  const [
    {
      loadStripe,
      nullifyStyles,
      Page,
      stripeClient,
      stripeScript,
      themeObject,
      titleText,
      windowError
    },
    dispatch
  ] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setStripeClient') return { ...prevState, stripeClient: action.stripe }
    if (action.type === 'setStripeScript') return { ...prevState, stripeScript: action.stripeScript }
    if (action.type === 'setTheme') return { ...prevState, themeObject: action.theme }
    if (action.type === 'setTitle') return { ...prevState, titleText: action.title }
    if (action.type === 'setWindowError') return { ...prevState, windowError: action.error }
    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => dispatch({ type: 'reset' })
  }, [])

  const theme = useMemo(
    () => createMuiTheme(themeObject),
    [themeObject]
  )

  useEffect(() => {
    if (loadStripe && !stripeScript) {
      const newStripeScript = createScript({
        document,
        async: true,
        onload: () => dispatch({ stripe: window.Stripe, type: 'setStripeClient' }),
        src: 'https://js.stripe.com/v3/'
      })

      dispatch({ stripeScript: newStripeScript, type: 'setStripeScript' })

      // TODO: Catch window script error
      document.body.appendChild(newStripeScript)
    }
  }, [loadStripe, stripeScript])

  useEffect(() => {
    // TODO: Remove
    console.log({ stripeClient, stripeScript })
  }, [stripeClient, stripeScript])

  useEffect(() => {
    // TODO: Verify
    window.onerror = (...props) => dispatch({ error: props, type: 'setWindowError' })
  }, [])

  useEffect(() => {
    // TODO: Verify
    if (windowError) console.error({ windowError })
  }, [windowError])

  return (
    <>
      <Head>
        <title>
          {titleText}
        </title>
      </Head>

      <ThemeProvider {...{ theme }}>
        {nullifyStyles ? <CssBaseline /> : null}
        <Page
          {...{
            stripeClient,
            stripeScript,
            theme,
            themeObject,
            titleText,
            setTheme: theme => dispatch({ theme, type: 'setTheme' }),
            setTitle: title => dispatch({ title, type: 'setTitle' })
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default useApp
