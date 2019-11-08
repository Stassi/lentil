import React from 'react'
import normalizeParameters from '../src/enhancers/normalizeStripeCard'
import stringifyBoolean from '../src/utility/stringifyBoolean'

const StripeCardDebugger = ({
  brand,
  errorCode,
  errorMessage,
  errorType,
  inputComplete: inputCompleteBool,
  inputEmpty: inputEmptyBool,
  postalCode
}) => {
  const [inputComplete, inputEmpty] = [
    inputCompleteBool,
    inputEmptyBool
  ].map(stringifyBoolean)

  return (
    <>
      <br />
      Brand: {brand}
      <br />
      Postal code: {postalCode}
      <br />
      Empty: {inputEmpty}
      <br />
      Complete: {inputComplete}
      <br />
      Error code: {errorCode}
      <br />
      Error message: {errorMessage}
      <br />
      Error type: {errorType}
    </>
  )
}

export default normalizeParameters(StripeCardDebugger)
