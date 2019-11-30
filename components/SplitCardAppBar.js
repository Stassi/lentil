import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(({
  breakpoints,
  palette,
  shape,
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
  grid: {
    transition: transitions.create(['padding-left', 'padding-right']),
    [breakpoints.up('md')]: {
      maxWidth: breakpoints.values.sm,
      padding: spacing(0, 2)
    },
    '& .MuiGrid-item': {
      padding: spacing(0, 0.25),
      transition: transitions.create(['padding-left', 'padding-right']),
      [breakpoints.up('md')]: {
        padding: spacing(0, 0.5)
      }
    }
  },
  root: {
    flexGrow: 1
  },
  submitButton: {
    marginLeft: spacing(2),
    transition: transitions.create(['margin-left']),
    [breakpoints.down('xs')]: {
      marginLeft: spacing(1)
    }
  },
  textField: {
    backgroundColor: fade(palette.primary.main, 0.15),
    borderRadius: shape.borderRadius,
    transition: transitions.create(['background-color']),
    '&:hover': {
      backgroundColor: fade(palette.primary.main, 0.25)
    },
    '& .MuiFilledInput-root': {
      borderColor: palette.background.paper,
      borderStyle: 'solid',
      borderWidth: 1,
      transition: transitions.create(['border-color']),
      '&.Mui-focused': {
        borderColor: palette.primary.main
      },
      '&:after': {
        borderBottomColor: palette.secondary.main
      },
      '&.Mui-error:after': {
        borderBottomColor: palette.error.main
      }
    },
    '& label.Mui-focused': {
      color: palette.secondary.main,
      '&.Mui-error': {
        color: palette.error.main
      }
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

const SplitCardAppBar = () => {
  const {
    closeButton: closeButtonClass,
    grid: gridClass,
    root: rootClass,
    submitButton: submitButtonClass,
    textField: textFieldClass,
    title: titleClass
  } = useStyles()

  return (
    <div className={rootClass}>
      <AppBar color='default' position='static'>
        <Toolbar>
          <IconButton
            className={closeButtonClass}
            color='inherit'
            edge='start'
          >
            <CloseIcon />
          </IconButton>

          <Typography className={titleClass} variant='h6'>
            Payment
          </Typography>

          <Grid
            className={gridClass}
            container
          >
            <Grid item xs={12} sm>
              <TextField
                autoFocus
                className={textFieldClass}
                fullWidth
                label='Card number'
                margin='dense'
                variant='filled'
              />
            </Grid>
            <Grid item xs={7} sm={3}>
              <TextField
                className={textFieldClass}
                fullWidth
                label='MM / YY'
                margin='dense'
                variant='filled'
              />
            </Grid>
            <Grid item xs={5} sm={2}>
              <TextField
                className={textFieldClass}
                fullWidth
                label='CVC'
                margin='dense'
                variant='filled'
              />
            </Grid>
          </Grid>

          <Button
            className={submitButtonClass}
            color='primary'
            variant='contained'
          >
            Pay
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default SplitCardAppBar
