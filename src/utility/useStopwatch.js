import { useEffect, useState } from 'react'

const useStopwatch = ({ interval, on }) => {
  const [time, setTime] = useState(null)

  useEffect(() => { if (on) { setTime(0) } }, [on])

  useEffect(
    () => { if (time && !on) setTime(null) },
    [on, time]
  )

  useEffect(() => {
    if (typeof time === 'number') {
      const id = setTimeout(() => { setTime(time + interval) }, interval)
      return () => { clearTimeout(id) }
    }
  }, [time])

  return time
}

export default useStopwatch
