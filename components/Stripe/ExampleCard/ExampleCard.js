import React, {
  useEffect,
  useState
} from 'react'
import stateFromPairs from '../../../src/utility/stateFromGetterSetterPairs'
import useStopwatch from '../../../src/utility/useStopwatch'
import brandLogo from '../../../src/brandLogo'
import createCharge from '../../../src/stripe/createCharge/client'
import exampleCharge from '../../../src/stripe/exampleCharge'
import useCardElement from '../../../src/stripe/useCardElement'
import useElements from '../../../src/stripe/useElements'
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
    loadingTimeout,
    setCharge,
    setChargeRequest,
    setChargeResponse,
    setLoading,
    setLoadingAnimation,
    setLoadingTimeout,
    setToken,
    token: {
      token: {
        id: tokenId
      } = {}
    } = {}
  } = state(useState({}))

  const {
    stripeCard,
    Component: CardElement,
    loaded: cardElementLoaded,
    stripeCard: {
      brand,
      error,
      empty: inputEmpty = true
    } = {}
  } = useCardElement()

  const timeSinceLoad = useStopwatch({
    interval: 1000,
    on: loading
  })

  const errorOrInputEmpty = error || inputEmpty

  const oneSecondSinceLoad = timeSinceLoad >= 1000
  const tenSecondsSinceLoad = timeSinceLoad >= 10000

  const displayCharge = charge && oneSecondSinceLoad
  const displayError = errorOrInputEmpty && oneSecondSinceLoad
  const displayLoadingAnimation = !errorOrInputEmpty && oneSecondSinceLoad
  const displayLoadingTimeout = tenSecondsSinceLoad

  useEffect(() => {
    if (displayCharge) {
      // TODO: Inform user
      console.log({ charge })
      setLoading(false)
    }
  }, [charge, displayCharge])

  useEffect(() => {
    if (displayError) {
      // TODO: Inform user
      console.error({ error, inputEmpty })
      setLoading(false)
    }
  }, [
    displayError,
    error,
    inputEmpty
  ])

  useEffect(() => {
    if (displayLoadingAnimation) { setLoadingAnimation(true) }
  }, [displayLoadingAnimation])

  useEffect(() => {
    if (displayLoadingTimeout) { setLoadingTimeout(true) }
  }, [displayLoadingTimeout])

  useEffect(() => {
    if (!loading) { setLoadingAnimation(false) }
  }, [loading])

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
    (async () => {
      if (
        loading &&
        !inputEmpty &&
        !error
      ) setToken(await stripe.createToken({ name: 'Name' }))
    })()
  }, [
    error,
    inputEmpty,
    loading,
    stripe
  ])

  useEffect(() => {
    if (tokenId) setChargeRequest({ source: tokenId, ...exampleCharge })
  }, [tokenId])

  return (
    <PureExampleCard
      {...{
        CardElement,
        cardElementLoaded,
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
