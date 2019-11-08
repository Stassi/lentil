import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const PaymentForm = () => (
  <>
    <Typography gutterBottom variant='h6'>
      Payment method
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id='cardName'
          label='Name on card'
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id='cardNumber'
          label='Card number'
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id='expDate'
          label='Expiry date'
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          helperText='Last three digits on signature strip'
          id='cvv'
          label='CVV'
          required
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={(
            <Checkbox
              color='secondary'
              name='saveCard'
              value='yes'
            />
          )}
          label='Remember credit card details for next time'
        />
      </Grid>
    </Grid>
  </>
)

export default PaymentForm
