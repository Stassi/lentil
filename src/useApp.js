import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import apiTestKeys from '../src/stripe/apiTestKeys'
import useStripe from './useStripe'

const { publishable: publishableKey } = apiTestKeys

const useApp = ({ Component, ...pageProps }) => {
  const initialState = {
    nullifyStyles: true,
    themeObject: {
      palette: {
        primary: {
          main: '#6772e5'
        },
        type: 'dark'
      }
    },
    titleText: 'lentil'
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

  const { instance: stripe, ...stripeProps } = useStripe({ publishableKey })

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
            ...stripeProps,
            stripe,
            theme,
            themeObject,
            titleText,
            setTheme: theme => dispatch({ theme, type: 'setTheme' }),
            setTitle: title => dispatch({ title, type: 'setTitle' }),
            toggleDarkOrLightTheme: () => dispatch({
              theme: {
                palette: {
                  ...themeObject.palette,
                  type: theme.palette.type === 'light' ? 'dark' : 'light'
                }
              },
              type: 'setTheme'
            }),
            ...pageProps
          }}
        />
      </ThemeProvider>
    </>
  )
}

export default useApp
