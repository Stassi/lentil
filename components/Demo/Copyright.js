import React from 'react'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const Copyright = () => (
  <Typography
    align='center'
    color='textSecondary'
    variant='body2'
  >
    {'Copyright © '}
    <MuiLink
      color='inherit'
      href='https://material-ui.com/'
    >
      Your Website
    </MuiLink>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Copyright
