import React, {
  useMemo,
  useState
} from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const useMuiTheme = () => {
  const [configuration, setTheme] = useState({
    palette: {
      primary: {
        main: '#6772e5'
      },
      type: 'dark'
    }
  })

  const theme = useMemo(
    () => createMuiTheme(configuration),
    [configuration]
  )

  return {
    configuration,
    setTheme,
    theme,
    Provider: ({ children }) => (
      <ThemeProvider {...{ theme }}>
        {children}
      </ThemeProvider>
    ),
    toggleDarkOrLightTheme: () => setTheme({
      palette: {
        ...configuration.palette,
        type: theme.palette.type === 'light' ? 'dark' : 'light'
      }
    })
  }
}

export default useMuiTheme
