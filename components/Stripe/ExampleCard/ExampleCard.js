import React, {
  useEffect,
  useState
} from 'react'
import secondsToMilliseconds from '../../../src/utility/secondsToMilliseconds'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import useChronometer from '../../../src/utility/useChronometer'
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
    loadingAnimation,
    loadingTimeout,
    setChargeOptions,
    setLoadingAnimation,
    setLoadingTimeout,
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
    active: loading,
    restart: restartLoading,
    stop: stopLoading,
    time: loadingTime
  } = useChronometer({
    end: secondsToMilliseconds(10),
    interval: secondsToMilliseconds(1)
  })

  const {
    token: {
      id: tokenId
    } = {}
  } = useToken({ stripe, options: tokenOptions })

  const charge = useCharge(chargeOptions)

  const loadingAndValidInput = loading && validInput

  const oneSecondSinceLoad = loadingTime >= 1000
  const tenSecondsSinceLoad = loadingTime >= 10000

  const displayChargeAndDisableLoading = charge && oneSecondSinceLoad
  const displayErrorAndDisableLoading = !validInput && oneSecondSinceLoad
  const displayLoadingAnimation = validInput && oneSecondSinceLoad
  const displayLoadingTimeout = validInput && tenSecondsSinceLoad

  useEffect(() => {
    if (tokenId) setChargeOptions({ ...exampleCharge, source: tokenId })
  }, [tokenId])

  useEffect(() => {
    if (displayChargeAndDisableLoading) {
      // TODO: Inform user
      console.log({ charge })
      stopLoading()
    }
  }, [charge, displayChargeAndDisableLoading])

  useEffect(() => {
    if (displayErrorAndDisableLoading) {
      // TODO: Inform user
      console.error({ empty, error })
      stopLoading()
    }
  }, [
    displayErrorAndDisableLoading,
    empty,
    error
  ])

  useEffect(() => {
    if (displayLoadingAnimation) { setLoadingAnimation(true) }
  }, [displayLoadingAnimation])

  useEffect(() => {
    if (displayLoadingTimeout) { setLoadingTimeout(true) }
  }, [displayLoadingTimeout])

  useEffect(() => {
    if (!loading) {
      setLoadingAnimation(false)
      setTokenOptions()
    }
  }, [loading])

  useEffect(() => {
    if (loadingAndValidInput) { setTokenOptions(exampleTokenOptions) }
  }, [loadingAndValidInput])

  useEffect(() => {
    if (loadingTimeout) {
      // TODO: Inform user
      console.warn({ loadingTimeout })
    }
  }, [loadingTimeout])

  return (
    <PureExampleCard
      {...{
        CardElement,
        cardElementLoaded,
        loadingAnimation,
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
