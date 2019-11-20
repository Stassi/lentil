import {
  useEffect,
  useMemo,
  useReducer
} from 'react'
import createScript from './utility/createScript'

const useStripe = ({ publishableKey, options }) => {
  const initialState = { client: null, script: null }

  const [{ client, script }, dispatch] = useReducer((prevState, action) => {
    if (action.type === 'reset') return initialState
    if (action.type === 'setClient') return { ...prevState, client: action.client }
    if (action.type === 'setScript') return { ...prevState, script: action.script }
    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => dispatch({ type: 'reset' })
  }, [])

  useEffect(() => {
    if (!script) {
      const newScript = createScript({
        document,
        async: true,
        onload: () => dispatch({ client: window.Stripe, type: 'setClient' }),
        src: 'https://js.stripe.com/v3/'
      })

      dispatch({ script: newScript, type: 'setScript' })

      // TODO: Catch script error
      document.body.appendChild(newScript)
    }
  }, [script])

  const instance = useMemo(() => {
    if (client) return client(publishableKey, options)
  }, [
    client,
    publishableKey,
    options
  ])

  return {
    client,
    instance,
    script
  }
}

export default useStripe
