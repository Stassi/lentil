import React, { useState } from 'react'
import { CardElement } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import configuration from '../../src/configuration'
import exampleCharge from './exampleCharge'
import CardDebugger from './CardDebugger'
import ExpandableCard from '../ExpandableCard'
import useElements from './useElements'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  root: {
    marginTop: theme.spacing(3)
  }
}))

const {
  stripeApiTestKeys: {
    publishable: apiKey
  }
} = configuration

const ExampleStripeCard = ({ stripe }) => {
  const {
    button: buttonClass,
    media: mediaClass,
    root: rootClass
  } = useStyles()

  const [stripeCard, handleStripeCardChange] = useState({})

  // TODO: Implement
  const [, handleCardElementReady] = useState(null)
  const [, setToken] = useState({})
  const [, setResponse] = useState({})
  const [, setResponseBody] = useState({})

  const handleSubmit = async () => {
    const token = await stripe.createToken({ name: 'Name' })
    setToken(token)

    const {
      token: {
        id: source
      }
    } = token

    const response = await window.fetch(
      '/api/charge',
      {
        body: JSON.stringify({ source, ...exampleCharge }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )
    setResponse(response)

    if (response.ok) {
      const responseJson = await response.json()
      setResponseBody(responseJson)
    }
  }

  return (
    <Container className={rootClass} maxWidth='sm'>
      <ExpandableCard
        CollapsibleContent={
          <>
            <CardDebugger {...{ stripeCard }} />
          </>
        }
        Media={(
          <CardMedia
            className={mediaClass}
            image='//via.placeholder.com/345x194?text=Example+media'
            title='Example media'
          />
        )}
        PrimaryButton={(
          <Button
            className={buttonClass}
            color='primary'
            onClick={handleSubmit}
            variant='contained'
          >
            Purchase
          </Button>
        )}
      >
        <Typography
          component='h2'
          gutterBottom
          variant='h5'
        >
          React Stripe Elements Example
        </Typography>
        <Typography
          color='textSecondary'
          component='p'
          gutterBottom
          variant='body2'
        >
          Would you like to complete the purchase?
        </Typography>
        <CardElement
          onChange={handleStripeCardChange}
          onReady={handleCardElementReady}
        />
      </ExpandableCard>
    </Container>
  )
}

export default useElements(apiKey)(ExampleStripeCard)
