import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'

const useClasses = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      marginTop: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const Layout = ({ titleText, toggleDarkOrLightTheme }) => {
  const {
    paper: paperClass,
    root: rootClass,
    title: titleClass
  } = useClasses()

  return (
    <div className={rootClass}>
      <AppBar position='static'>
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

          <IconButton color='inherit' href='https://github.com/Stassi/lentil'>
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth='sm'>
        <Paper className={paperClass}>
          <Typography component='h1' variant='h4'>
            Debug
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

export default Layout
