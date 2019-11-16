import { useEffect, useState } from 'react'

const useToken = ({ options, stripe }) => {
  const [token, setToken] = useState({})

  useEffect(() => {
    (async () => {
      if (options) setToken(await stripe.createToken(options))
    })()
  }, [options, stripe])

  return token
}

export default useToken
