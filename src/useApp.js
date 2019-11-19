import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Head from 'next/head'
import MuiCssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import createScript from './utility/createScript'

const useApp = ({ Component, ...pageProps }) => {
  const initialState = {
    CssBaseline: ({ nullifyStyles }) => nullifyStyles ? <MuiCssBaseline /> : null,
    Page: ({ ...props }) => <Component {...{ ...props, ...pageProps }} />,
    loadStripe: true,
    nullifyStyles: true,
    stripe: null,
    stripeScript: null,
    themeObject: {},
    titleText: 'App'
  }

  const [
    {
      CssBaseline,
      Page,
      loadStripe,
      nullifyStyles,
      stripe,
      stripeScript,
      themeObject,
      titleText
    },
    dispatch
  ] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setStripe') return { ...prevState, stripe: action.stripe }
    if (action.type === 'setStripeScript') return { ...prevState, stripeScript: action.stripeScript }
    if (action.type === 'setTheme') return { ...prevState, themeObject: action.theme }
    if (action.type === 'setTitle') return { ...prevState, titleText: action.title }
    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => dispatch({ type: 'reset' })
  }, [])

  useEffect(() => {
    if (loadStripe && !stripeScript) {
      const newStripeScript = createScript({
        document,
        async: true,
        onload: () => dispatch({ stripe: window.Stripe, type: 'setStripe' }),
        src: 'https://js.stripe.com/v3/'
      })

      dispatch({ stripeScript: newStripeScript, type: 'setStripeScript' })

      document.body.appendChild(newStripeScript)
    }
  }, [loadStripe, stripeScript])

  const theme = useMemo(
    () => createMuiTheme(themeObject),
    [themeObject]
  )

  return (
    <>
      <Head>
        <title>
          {titleText}
        </title>
      </Head>

      <ThemeProvider {...{ theme }}>
        <CssBaseline {...{ nullifyStyles }} />
        <Page
          {...{
            stripe,
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
