import React, { forwardRef } from 'react'

const RefComponent = forwardRef((
  {
    component: Component,
    ...props
  },
  ref
) => <Component {...{ ref, ...props }} />)

export default RefComponent
