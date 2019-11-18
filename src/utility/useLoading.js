import { useEffect, useReducer } from 'react'
import secondsToMilliseconds from './secondsToMilliseconds'
import useChronometer from './useChronometer'

const useLoading = () => {
  const {
    active,
    restart,
    time,
    stop: stopChronometer
  } = useChronometer({
    end: secondsToMilliseconds(10),
    interval: secondsToMilliseconds(1)
  })

  const defaultState = {
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
    if (actions.type === 'setFeedbackInitial') {
      return {
        feedbackFinal: false,
        feedbackInitial: true
      }
    }

    if (actions.type === 'setFeedbackFinal') {
      return {
        feedbackFinal: true,
        feedbackInitial: false
      }
    }

    if (actions.type === 'stop') {
      return defaultState
    }

    throw new Error()
  }, defaultState)

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
    stop: () => {
      stopChronometer()
      dispatch({ type: 'stop' })
    }
  }
}

export default useLoading
