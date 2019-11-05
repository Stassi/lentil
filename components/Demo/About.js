import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Copyright from './Copyright'
import Link from '../Link'
import ProTip from './ProTip'

const About = () => (
  <Container maxWidth='sm'>
    <Box my={4}>
      <Typography
        component='h1'
        gutterBottom
        variant='h4'
      >
        Next.js example
      </Typography>
      <Button
        color='primary'
        component={Link}
        href='/'
        naked
        variant='contained'
      >
        Go to the main page
      </Button>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
)

export default About
