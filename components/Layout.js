import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'

const useClasses = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
})

const Layout = ({ titleText, toggleDarkOrLightTheme }) => {
  const {
    root: rootClass,
    title: titleClass
  } = useClasses()

  return (
    <div className={rootClass}>
      <AppBar>
        <Toolbar>
          <Typography className={titleClass} variant='h6'>
            {titleText}
          </Typography>

          <IconButton
            color='inherit'
            onClick={(ev) => {
              ev.preventDefault()
              toggleDarkOrLightTheme()
            }}
          >
            <Brightness7Icon />
          </IconButton>

          <IconButton href='https://github.com/Stassi/lentil'>
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Layout
