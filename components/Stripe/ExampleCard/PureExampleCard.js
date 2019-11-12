import React from 'react'
import { CardElement } from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import CardDebugger from '../CardDebugger'
import ExpandableCard from '../../ExpandableCard'

const PureExampleCard = ({
  elementLoaded,
  handleCardElementReady,
  handleStripeCardChange,
  handleSubmit,
  image,
  stripeCard,
  classes: {
    button: buttonClass,
    media: mediaClass,
    root: rootClass
  }
}) => (
  <Slide direction='down' in={elementLoaded}>
    <Container className={rootClass} maxWidth='sm'>
      <ExpandableCard
        CollapsibleContent={<CardDebugger {...{ stripeCard }} />}
        Media={(
          <CardMedia
            {...{ image }}
            className={mediaClass}
            title='Brand logo'
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
  </Slide>
)

export default PureExampleCard
