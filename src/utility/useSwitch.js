import { useMemo, useState } from 'react'

const useSwitch = () => {
  const [active, setActive] = useState(false)

  const { off, on } = useMemo(() => ({
    off: () => setActive(false),
    on: () => setActive(true)
  }), [])

  return {
    active,
    off,
    on
  }
}

export default useSwitch
