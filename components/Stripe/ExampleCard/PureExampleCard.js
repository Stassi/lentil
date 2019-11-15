import React from 'react'
import { CardElement } from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import attribution from '../../../src/brandLogo/attribution'
import ExpandableCard from '../../ExpandableCard'
import CardDebugger from '../CardDebugger'

const PureExampleCard = ({
  elementLoaded,
  handleSubmit,
  image,
  loadingAnimation,
  stripeCard,
  classes: {
    button: buttonClass,
    buttonProgress: buttonProgressClass,
    buttonWrapper: buttonWrapperClass,
    footer: footerClass,
    media: mediaClass,
    root: rootClass
  },
  setElement: handleCardElementReady,
  setStripeCard: handleStripeCardChange
}) => (
  <Slide in={elementLoaded}>
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
          <div className={buttonWrapperClass}>
            <Button
              className={buttonClass}
              color='primary'
              disabled={loadingAnimation}
              onClick={handleSubmit}
              variant='contained'
            >
              Purchase
            </Button>
            {loadingAnimation && (
              <CircularProgress
                className={buttonProgressClass}
                size={24}
              />
            )}
          </div>
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
      <Typography
        align='center'
        className={footerClass}
        color='textSecondary'
        variant='body2'
      >
        {attribution}
      </Typography>
    </Container>
  </Slide>
)

export default PureExampleCard
