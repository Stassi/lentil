import React, {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import Head from 'next/head'
import MuiCssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const useApp = ({ Component, ...pageProps }) => {
  const initialState = {
    CssBaseline: ({ nullifyStyles }) => nullifyStyles ? <MuiCssBaseline /> : null,
    Page: ({ ...props }) => <Component {...{ ...props, ...pageProps }} />,
    nullifyStyles: true,
    themeObject: {},
    titleText: 'App'
  }

  const [
    {
      CssBaseline,
      Page,
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
