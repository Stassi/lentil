import { useEffect, useReducer } from 'react'

const useChronometer = ({ end, interval }) => {
  const initialState = {
    active: false,
    time: null,
    timeoutId: null
  }

  const [
    {
      active,
      time,
      timeoutId
    },
    dispatch
  ] = useReducer((prevState, actions) => {
    if (actions.type === 'increment') {
      return {
        ...prevState,
        time: prevState.time + interval
      }
    }

    if (actions.type === 'reset') {
      if (prevState.timeoutId) clearTimeout(prevState.timeoutId)
      return initialState
    }

    if (actions.type === 'removeTimeout') {
      return {
        ...prevState,
        timeoutId: null
      }
    }

    if (actions.type === 'restart') {
      if (prevState.timeoutId) clearTimeout(prevState.timeoutId)
      return {
        active: true,
        time: 0,
        timeoutId: null
      }
    }

    if (actions.type === 'setTimeoutId') {
      return {
        ...prevState,
        timeoutId: actions.timeoutId
      }
    }

    throw new Error()
  }, initialState)

  useEffect(() => {
    return () => {
      dispatch({ type: 'reset' })
    }
  }, [])

  useEffect(() => {
    if (active && !timeoutId) {
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'increment' })
        dispatch({ type: 'removeTimeout' })
      }, interval)

      dispatch({
        timeoutId,
        type: 'setTimeoutId'
      })
    }
  }, [active, timeoutId])

  useEffect(() => {
    if (end && time >= end) dispatch({ type: 'reset' })
  }, [time])

  return {
    active,
    time,
    reset: () => dispatch({ type: 'reset' }),
    restart: () => dispatch({ type: 'restart' })
  }
}

export default useChronometer
