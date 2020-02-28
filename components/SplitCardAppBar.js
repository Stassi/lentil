import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import SplitCard from './Stripe/SplitCard'

const useStyles = makeStyles(({
  breakpoints,
  spacing,
  transitions
}) => ({
  closeButton: {
    marginRight: spacing(2),
    transition: transitions.create(['margin-right']),
    [breakpoints.down('xs')]: {
      marginRight: spacing(1)
    }
  },
  submitButton: {
    marginLeft: spacing(2),
    transition: transitions.create(['margin-left']),
    [breakpoints.down('xs')]: {
      marginLeft: spacing(1)
    }
  },
  title: {
    flex: 1,
    marginRight: spacing(2),
    [breakpoints.down('xs')]: {
      display: 'none'
    }
  }
}))

const SplitCardAppBar = ({ closeDialog, theme }) => {
  const {
    closeButton: closeButtonClass,
    submitButton: submitButtonClass,
    title: titleClass
  } = useStyles()

  return (
    <AppBar color='default' position='relative'>
      <Toolbar>
        <IconButton
          className={closeButtonClass}
          color='inherit'
          edge='start'
          onClick={closeDialog}
        >
          <CloseIcon />
        </IconButton>

        <Typography className={titleClass} variant='h6'>
          Payment
        </Typography>

        <SplitCard {...{ theme }} />

        <Button
          className={submitButtonClass}
          color='primary'
          onClick={closeDialog}
          variant='contained'
        >
          Pay
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default SplitCardAppBar
