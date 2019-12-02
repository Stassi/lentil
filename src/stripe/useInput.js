import { useMemo, useState } from 'react'

const useInput = () => {
  const [element, setElement] = useState(null)
  const [changeObject, setChangeObject] = useState(null)

  const {
    error,
    complete = false,
    empty = true,
    error: {
      message: errorMessage
    } = {}
  } = useMemo(() => changeObject || {}, [changeObject])

  return {
    complete,
    element,
    empty,
    error,
    errorMessage,
    setChangeObject,
    setElement
  }
}

export default useInput
