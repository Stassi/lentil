import React, {
  useEffect,
  useState
} from 'react'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import useStopwatch from '../../../src/utility/useStopwatch'
import brandLogo from '../../../src/brandLogo'
import createCharge from '../../../src/stripe/createCharge/client'
import exampleCharge from '../../../src/stripe/exampleCharge'
import exampleTokenOptions from '../../../src/stripe/exampleTokenOptions'
import useCardElement from '../../../src/stripe/useCardElement'
import useElements from '../../../src/stripe/useElements'
import useToken from '../../../src/stripe/useToken'
import PureExampleCard from './PureExampleCard'
import useStyles from './useStyles'
import stateNames from './state'

const state = stateFromPairs(stateNames)

const ExampleCard = ({ stripe }) => {
  const {
    charge,
    chargeRequest,
    chargeResponse,
    loading,
    loadingAnimation,
    loadingTimeout,
    setCharge,
    setChargeRequest,
    setChargeResponse,
    setLoading,
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

  const timeSinceLoad = useStopwatch({
    interval: 1000,
    on: loading
  })

  const {
    token: {
      id: tokenId
    } = {}
  } = useToken({ stripe, options: tokenOptions })

  const loadingAndValidInput = loading && validInput

  const oneSecondSinceLoad = timeSinceLoad >= 1000
  const tenSecondsSinceLoad = timeSinceLoad >= 10000

  const displayChargeAndDisableLoading = charge && oneSecondSinceLoad
  const displayErrorAndDisableLoading = !validInput && oneSecondSinceLoad
  const displayLoadingAnimation = validInput && oneSecondSinceLoad
  const displayLoadingTimeout = validInput && tenSecondsSinceLoad

  useEffect(() => {
    if (displayChargeAndDisableLoading) {
      // TODO: Inform user
      console.log({ charge })
      setLoading(false)
    }
  }, [charge, displayChargeAndDisableLoading])

  useEffect(() => {
    if (displayErrorAndDisableLoading) {
      // TODO: Inform user
      console.error({ empty, error })
      setLoading(false)
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

  useEffect(() => {
    (async () => {
      if (chargeRequest) setChargeResponse(await createCharge(chargeRequest))
    })()
  }, [chargeRequest])

  useEffect(() => {
    (async () => {
      if (chargeResponse) setCharge(await chargeResponse.json())
    })()
  }, [chargeResponse])

  useEffect(() => {
    if (tokenId) setChargeRequest({ source: tokenId, ...exampleCharge })
  }, [tokenId])

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
        setLoading(true)
      }}
      image={brandLogo(brand)}
    />
  )
}

export default useElements(ExampleCard)
