import React, { useImperativeHandle } from 'react'

const Input = ({
  className,
  disabled,
  element,
  id,
  inputRef,
  onBlur,
  onChange,
  onFocus,
  onReady,
  placeholder,
  style,
  value,
  component: Component
}) => {
  useImperativeHandle(
    inputRef,
    () => ({
      focus: () => element.focus()
    }),
    [element]
  )

  return (
    <Component
      {...{
        className,
        disabled,
        id,
        onBlur,
        onChange,
        onFocus,
        onReady,
        placeholder,
        style,
        value
      }}
    />
  )
}

export default Input
