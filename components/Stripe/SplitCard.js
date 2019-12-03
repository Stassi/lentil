import React from 'react'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from 'react-stripe-elements'
import { fade, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import TextField from './TextField'

const useStyles = makeStyles(({
  breakpoints,
  palette,
  shape,
  spacing,
  transitions
}) => ({
  root: {
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
    },
    '& .MuiFormHelperText-root': {
      marginBottom: spacing(0.5)
    }
  }
}))

const SplitCard = ({ theme }) => {
  const { root: rootClass, textField: textFieldClass } = useStyles()

  return (
    <Grid className={rootClass} container>
      <Grid item sm xs={12}>
        <TextField
          {...{ theme }}
          autoFocus
          className={textFieldClass}
          component={CardNumberElement}
          fullWidth
          label='Card number'
          margin='dense'
          variant='filled'
        />
      </Grid>

      <Grid item sm={3} xs={7}>
        <TextField
          {...{ theme }}
          className={textFieldClass}
          component={CardExpiryElement}
          fullWidth
          label='MM / YY'
          margin='dense'
          variant='filled'
        />
      </Grid>

      <Grid item sm={2} xs={5}>
        <TextField
          {...{ theme }}
          className={textFieldClass}
          component={CardCvcElement}
          fullWidth
          label='CVC'
          margin='dense'
          variant='filled'
        />
      </Grid>
    </Grid>
  )
}

export default SplitCard
