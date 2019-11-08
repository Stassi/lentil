import React, { useState } from 'react'
import { CardElement } from 'react-stripe-elements'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import configuration from '../../src/configuration'
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

  const [purchaseComplete, setPurchaseComplete] = useState(false)

  const [purchasingEnabled, setPurchasingEnabled] = useState(true)
  const disablePurchasing = () => setPurchasingEnabled(false)

  // TODO: Implement
  const [cardElement, handleCardElementReady] = useState(null)

  const [stripeCard, handleStripeCardChange] = useState({})

  const handleSubmit = async () => {
    disablePurchasing()

    const {
      token: {
        id: tokenId
      }
    } = await stripe.createToken({ name: 'Name' })

    const response = await window.fetch(
      '/api/charge/example',
      {
        body: JSON.stringify({ tokenId }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }
    )

    if (response.ok) setPurchaseComplete(true)
  }

  return purchaseComplete ? (
    <h1 className={rootClass}>
      Purchase Complete
    </h1>
  ) : (
    <Container className={rootClass} maxWidth='sm'>
      <ExpandableCard
        BodyContent={(
          <>
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
          </>
        )}
        CollapsibleContent={<CardDebugger {...{ stripeCard }} />}
        Media={(
          <CardMedia
            className={mediaClass}
            image='//via.placeholder.com/345x194?text=Example+media'
            title='Example media'
          />
        )}
        PrimaryButton={(
          <Button
            color='primary'
            className={buttonClass}
            disabled={!purchasingEnabled}
            onClick={handleSubmit}
            variant='contained'
          >
            Purchase
          </Button>
        )}
      />
    </Container>
  )
}

export default useElements(apiKey)(ExampleStripeCard)
