import { useEffect, useReducer } from 'react'
import secondsToMilliseconds from './secondsToMilliseconds'
import useChronometer from './useChronometer'

const useLoading = () => {
  const {
    active,
    reset,
    restart,
    time
  } = useChronometer({
    end: secondsToMilliseconds(10),
    interval: secondsToMilliseconds(1)
  })

  const initialState = {
    feedbackFinal: false,
    feedbackInitial: false
  }

  const [
    {
      feedbackFinal,
      feedbackInitial
    },
    dispatch
  ] = useReducer((prevState, actions) => {
    if (actions.type === 'reset') {
      return initialState
    }

    if (actions.type === 'setFeedbackFinal') {
      return {
        feedbackFinal: true,
        feedbackInitial: false
      }
    }

    if (actions.type === 'setFeedbackInitial') {
      return {
        feedbackFinal: false,
        feedbackInitial: true
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
    if (
      time >= secondsToMilliseconds(1) &&
      time < secondsToMilliseconds(10)
    ) dispatch({ type: 'setFeedbackInitial' })

    if (time >= secondsToMilliseconds(10)) dispatch({ type: 'setFeedbackFinal' })
  }, [time])

  return {
    active,
    feedbackFinal,
    feedbackInitial,
    restart,
    reset: () => {
      reset()
      dispatch({ type: 'reset' })
    }
  }
}

export default useLoading
