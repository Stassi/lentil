import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

const propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool
}

const NextComposed = React.forwardRef((
  {
    as,
    href,
    prefetch,
    ...other
  },
  ref
) => (
  <NextLink
    {...{
      as,
      href,
      prefetch
    }}
  >
    <a
      {...{
        ref,
        ...other
      }}
    />
  </NextLink>
))

NextComposed.propTypes = propTypes

export default NextComposed
