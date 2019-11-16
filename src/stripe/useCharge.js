import { useEffect, useState } from 'react'
import createCharge from './createCharge/client'

const useCharge = options => {
  const [charge, setCharge] = useState(null)
  const [chargeRequest, setChargeRequest] = useState(null)
  const [chargeResponse, setChargeResponse] = useState(null)

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
    if (options) setChargeRequest(options)
  }, [options])

  return charge
}

export default useCharge
