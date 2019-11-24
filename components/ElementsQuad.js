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
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(({ spacing }) => ({
  elementsContainer: {
    paddingTop: spacing(2)
  },
  elementsPaper: {
    padding: spacing(2)
  }
}))

const ElementsQuad = ({ Elements }) => {
  const {
    elementsContainer: elementsContainerClass,
    elementsPaper: elementsPaperClass
  } = useStyles()

  return (
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
  )
}

export default ElementsQuad
