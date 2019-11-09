import React from 'react'
import stringifyBoolean from '../../../src/utility/stringifyBoolean'
import normalizeParameters from './normalizeStripeCard'
import useStyles from './useStyles'
import PureCardDebugger from './PureCardDebugger'

const CardDebugger = ({
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

  const rows = [
    ['Brand', brand],
    ['Postal code', postalCode],
    ['Input complete', inputComplete],
    ['Input empty', inputEmpty],
    ['Error code', errorCode],
    ['Error message', errorMessage],
    ['Error type', errorType]
  ].map(([field, value]) => ({ field, value }))

  return <PureCardDebugger {...{ rows, classes: useStyles() }} />
}

export default normalizeParameters(CardDebugger)
