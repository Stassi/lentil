import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import MuiLink from '@material-ui/core/Link'
import NextComposed from './NextComposed'

const propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function InnerLink (props) {
  const {
    innerRef,
    naked,
    activeClassName = 'active',
    className: classNameProps,
    ...other
  } = props
  const router = useRouter()

  const className = clsx(
    classNameProps,
    {
      [activeClassName]: router.pathname === props.href && activeClassName
    }
  )

  return naked
    ? (
      <NextComposed
        className={className}
        ref={innerRef}
        {...other}
      />
    ) : (
      <MuiLink
        className={className}
        component={NextComposed}
        ref={innerRef}
        {...other}
      />
    )
}

const Link = forwardRef((props, ref) => (
  <InnerLink {...props} innerRef={ref} />
))

Link.propTypes = propTypes

export default Link
