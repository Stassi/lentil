import React from 'react'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const Copyright = () => (
  <Typography
    align='center'
    color='textSecondary'
    variant='body2'
  >
    {'Copyright © '}
    <Link color='inherit' href='https://material-ui.com/'>
      Your Website
    </Link>
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

export default Copyright
