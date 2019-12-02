import React, { useEffect } from 'react'
import MuiTextField from '@material-ui/core/TextField'
import Input from './Input'
import useInput from '../../../src/stripe/useInput'

const TextField = ({
  autoFocus,
  component,
  theme,
  ...props
}) => {
  const {
    element,
    empty,
    error,
    errorMessage,
    focused,
    setChangeObject,
    setElement,
    setFocused
  } = useInput()

  useEffect(() => {
    if (autoFocus && element) element.focus()
  }, [autoFocus, element])

  return (
    <MuiTextField
      error={!!error}
      helperText={errorMessage}
      InputLabelProps={{
        shrink: !empty || focused
      }}
      InputProps={{
        inputComponent: Input,
        inputProps: {
          component,
          element,
          onBlur: () => setFocused(false),
          onChange: setChangeObject,
          onFocus: () => setFocused(true),
          onReady: setElement,
          placeholder: '',
          style: {
            base: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: `${theme.typography.fontSize}px`
            },
            invalid: {
              color: theme.palette.text.primary
            }
          }
        }
      }}
      {...props}
    />
  )
}

export default TextField
