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
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'
import useElements from '../src/useElements'

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

const Layout = ({
  titleText,
  theme: { toggleDarkOrLight }
}) => {
  const {
    paper: paperClass,
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

      {[
        <CardElement key='card' />,
        <>
          <CardNumberElement />
          <CardExpiryElement />
          <CardCVCElement />
        </>,
        <IbanElement key='iban' supportedCountries={['SEPA']} />,
        <IdealBankElement key='ideal' />
      ].map((element, index) => (
        <Container key={index} maxWidth='sm'>
          <Paper className={paperClass}>
            <Elements>
              {element}
            </Elements>
          </Paper>
        </Container>
      ))}
    </div>
  )
}

export default Layout
