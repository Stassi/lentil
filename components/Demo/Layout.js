import React from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Link from '../Link'
import Copyright from './Copyright'
import ProTip from './ProTip'

const Layout = () => (
  <Container maxWidth='sm'>
    <Box my={4}>
      <Typography
        component='h1'
        gutterBottom
        variant='h4'
      >
        Next.js example
      </Typography>
      <Link
        color='secondary'
        href='/about'
      >
        Go to the about page
      </Link>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
)

export default Layout
