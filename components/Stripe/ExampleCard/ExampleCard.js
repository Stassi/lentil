import React, {
  useEffect,
  useState
} from 'react'
import brandLogo from '../../../src/brandLogo'
import createCharge from '../../../src/stripe/createCharge/client'
import exampleCharge from '../../../src/stripe/exampleCharge'
import useElements from '../../../src/stripe/useElements'
import PureExampleCard from './PureExampleCard'
import useStyles from './useStyles'

const ExampleCard = ({ stripe }) => {
  const [stripeCard, handleStripeCardChange] = useState({})
  const { brand } = stripeCard
  const [element, handleCardElementReady] = useState(null)
  const [token, setToken] = useState(null)
  const [chargeRequest, setChargeRequest] = useState(null)
  const [chargeResponse, setChargeResponse] = useState(null)
  const [charge, setCharge] = useState(null)

  const handleSubmit = async () => {
    setToken(await stripe.createToken({ name: 'Name' }))
  }

  useEffect(() => {
    if (element) element.focus()
  }, [element])

  useEffect(() => {
    const {
      token: {
        id: source
      } = {}
    } = token || {}

    if (source) setChargeRequest({ source, ...exampleCharge })
  }, [token])

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
    // TODO: Implement
    if (charge) console.log({ charge })
  }, [charge])

  return (
    <PureExampleCard
      {...{
        handleCardElementReady,
        handleStripeCardChange,
        handleSubmit,
        stripeCard,
        // TODO: Implement
        animatePurchaseLoading: false,
        classes: useStyles({ brand }),
        elementLoaded: !!element,
        image: brandLogo(brand)
      }}
    />
  )
}

export default useElements(ExampleCard)
