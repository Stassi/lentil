import React from 'react'
import {
  CardCVCElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  IbanElement,
  IdealBankElement
} from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'
import useElements from '../src/useElements'

const useStyles = makeStyles(({ palette, spacing }) => ({
  elementsContainer: {
    paddingTop: spacing(2)
  },
  elementsPaper: {
    color: palette.text.secondary,
    padding: spacing(2),
    textAlign: 'center'
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const Layout = ({
  titleText,
  theme: { toggleDarkOrLight }
}) => {
  const {
    elementsContainer: elementsContainerClass,
    elementsPaper: elementsPaperClass,
    root: rootClass,
    title: titleClass
  } = useStyles()

  const { Component: Elements } = useElements()

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
              toggleDarkOrLight()
            }}
          >
            <Brightness7Icon />
          </IconButton>

          <IconButton color='inherit' href='https://github.com/Stassi/lentil'>
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container className={elementsContainerClass} maxWidth='md'>
        <Grid container spacing={1}>

          <Grid item xs={6}>
            <Paper className={elementsPaperClass}>
              <Elements>
                <CardElement />
              </Elements>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={elementsPaperClass}>
              <Elements>
                <Grid container>
                  <Grid item xs={6}>
                    <CardNumberElement />
                  </Grid>
                  <Grid item xs>
                    <CardExpiryElement />
                  </Grid>
                  <Grid item xs>
                    <CardCVCElement />
                  </Grid>
                </Grid>
              </Elements>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={elementsPaperClass}>
              <Elements>
                <IbanElement supportedCountries={['SEPA']} />
              </Elements>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper className={elementsPaperClass}>
              <Elements>
                <IdealBankElement />
              </Elements>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </div>
  )
}

export default Layout
