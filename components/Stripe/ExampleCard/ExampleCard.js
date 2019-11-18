import React, {
  useEffect,
  useState
} from 'react'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import useInteraction from '../../../src/utility/useInteraction'
import brandLogo from '../../../src/brandLogo'
import exampleCharge from '../../../src/stripe/exampleCharge'
import exampleTokenOptions from '../../../src/stripe/exampleTokenOptions'
import useCardElement from '../../../src/stripe/useCardElement'
import useCharge from '../../../src/stripe/useCharge'
import useElements from '../../../src/stripe/useElements'
import useToken from '../../../src/stripe/useToken'
import PureExampleCard from './PureExampleCard'
import useStyles from './useStyles'
import stateNames from './state'

const state = stateFromPairs(stateNames)

const ExampleCard = ({ stripe }) => {
  const {
    chargeOptions,
    setChargeOptions,
    setTokenOptions,
    tokenOptions
  } = state(useState({}))

  const {
    stripeCard,
    validInput,
    Component: CardElement,
    loaded: cardElementLoaded,
    stripeCard: {
      brand,
      error,
      empty = true
    } = {}
  } = useCardElement()

  const {
    feedbackFinal,
    feedbackInitial,
    active: interactionActive,
    reset: resetInteraction,
    restart: restartInteraction
  } = useInteraction()

  useEffect(() => {
    if (!interactionActive) setTokenOptions()
  }, [interactionActive])

  useEffect(() => {
    if (interactionActive && validInput) setTokenOptions(exampleTokenOptions)
  }, [interactionActive, validInput])

  useEffect(() => {
    if (!validInput && feedbackInitial) {
      // TODO: Inform user
      console.error({ empty, error })
      resetInteraction()
    }
  }, [
    empty,
    error,
    feedbackInitial,
    validInput
  ])

  useEffect(() => {
    if (validInput && feedbackFinal) {
      // TODO: Inform user
      console.warn({ loadingTimeout: true })
    }
  }, [feedbackFinal, validInput])

  const charge = useCharge(chargeOptions)

  useEffect(() => {
    if (charge && feedbackInitial) {
      // TODO: Inform user
      console.log({ charge })
      resetInteraction()
    }
  }, [charge, feedbackInitial])

  const {
    token: {
      id: tokenId
    } = {}
  } = useToken({ stripe, options: tokenOptions })

  useEffect(() => {
    if (tokenId) setChargeOptions({ ...exampleCharge, source: tokenId })
  }, [tokenId])

  return (
    <PureExampleCard
      {...{
        CardElement,
        cardElementLoaded,
        feedbackInitial,
        stripeCard
      }}
      classes={useStyles({ brand })}
      handleSubmit={(ev) => {
        ev.preventDefault()
        restartInteraction()
      }}
      image={brandLogo(brand)}
    />
  )
}

export default useElements(ExampleCard)
