import { useEffect, useMemo, useState } from 'react'

const useInput = () => {
  const [changeObject, setChangeObject] = useState(null)
  const [element, setElement] = useState(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => console.log({ changeObject }), [changeObject])

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
    focused,
    setChangeObject,
    setElement,
    setFocused
  }
}

export default useInput
