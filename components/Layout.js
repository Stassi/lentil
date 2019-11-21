import React from 'react'
import { CardElement } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'
import Elements from './Stripe/Elements'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  paper: {
    marginBottom: spacing(3),
    marginTop: spacing(3),
    padding: spacing(2),
    [breakpoints.up(600 + spacing(3) * 2)]: {
      marginBottom: spacing(6),
      marginTop: spacing(6),
      padding: spacing(3)
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
  } = useStyles()

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
          <Typography component='h1' gutterBottom variant='h4'>
            Debug
          </Typography>

          <Elements>
            <CardElement />
          </Elements>
        </Paper>
      </Container>
    </div>
  )
}

export default Layout
