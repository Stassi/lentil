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
  ] = useReducer(
    (prevState, actions) => {
      if (actions.type === 'increment') {
        return {
          ...prevState,
          time: prevState.time + interval
        }
      }

      if (actions.type === 'removeTimeout') {
        return {
          ...prevState,
          timeoutId: null
        }
      }

      if (actions.type === 'start' || actions.type === 'restart') {
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

      if (actions.type === 'stop') {
        if (prevState.timeoutId) clearTimeout(prevState.timeoutId)
        return initialState
      }

      throw new Error()
    },
    initialState
  )

  useEffect(() => {
    return () => {
      dispatch({ type: 'stop' })
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
    if (end && time >= end) dispatch({ type: 'stop' })
  }, [time])

  return {
    active,
    time,
    restart: () => dispatch({ type: 'restart' }),
    start: () => dispatch({ type: 'start' }),
    stop: () => dispatch({ type: 'stop' })
  }
}

export default useChronometer
