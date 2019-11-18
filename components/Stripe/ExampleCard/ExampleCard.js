import React, {
  useEffect,
  useState
} from 'react'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import useLoading from '../../../src/utility/useLoading'
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
    active: loading,
    reset: resetLoading,
    restart: restartLoading
  } = useLoading()

  useEffect(() => {
    if (!loading) setTokenOptions()
  }, [loading])

  useEffect(() => {
    if (loading && validInput) setTokenOptions(exampleTokenOptions)
  }, [loading, validInput])

  useEffect(() => {
    if (!validInput && feedbackInitial) {
      // TODO: Inform user
      console.error({ empty, error })
      resetLoading()
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
      resetLoading()
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
        restartLoading()
      }}
      image={brandLogo(brand)}
    />
  )
}

export default useElements(ExampleCard)
