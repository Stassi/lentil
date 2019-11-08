import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AddressForm from './AddressForm'
import Copyright from './Copyright'
import PaymentForm from './PaymentForm'
import Review from './Review'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative'
  },
  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(3)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 600
    }
  },
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
  stepper: {
    padding: theme.spacing(3, 0, 5)
  }
}))

const steps = [
  'Shipping address',
  'Payment details',
  'Review your order'
]

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <AddressForm />
    case 1:
      return <PaymentForm />
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

const Checkout = () => {
  const {
    appBar: appBarClass,
    button: buttonClass,
    buttons: buttonsClass,
    layout: layoutClass,
    paper: paperClass,
    stepper: stepperClass
  } = useStyles()

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => { setActiveStep(activeStep + 1) }
  const handleBack = () => { setActiveStep(activeStep - 1) }

  return (
    <>
      <AppBar
        className={appBarClass}
        color='default'
        position='absolute'
      >
        <Toolbar>
          <Typography
            color='inherit'
            noWrap
            variant='h6'
          >
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={layoutClass}>
        <Paper className={paperClass}>
          <Typography
            align='center'
            component='h1'
            variant='h4'
          >
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={stepperClass}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography gutterBottom variant='h5'>
                  Thank you for your order.
                </Typography>
                <Typography variant='subtitle1'>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order
                  has shipped.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep)}
                <div className={buttonsClass}>
                  {activeStep !== 0 && (
                    <Button className={buttonClass} onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button
                    className={buttonClass}
                    color='primary'
                    onClick={handleNext}
                    variant='contained'
                  >
                    {activeStep === steps.length - 1
                      ? 'Place order'
                      : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </>
  )
}

export default Checkout
