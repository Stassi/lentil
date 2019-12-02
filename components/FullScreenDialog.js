import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import RefComponent from '../src/utility/RefComponent'
import useSwitch from '../src/utility/useSwitch'

const FullScreenDialog = ({
  AppBarComponent,
  children,
  OpenerComponent,
  AppBarComponentProps: appBarProps = {},
  OpenerComponentProps: {
    children: openerChildren,
    ...openerProps
  } = {}
}) => {
  const {
    active: isOpen,
    off: close,
    on: open
  } = useSwitch()

  return (
    <>
      <Dialog
        fullScreen
        onClose={close}
        open={isOpen}
        TransitionComponent={RefComponent}
        TransitionProps={{
          component: Slide,
          direction: 'up'
        }}
      >
        <AppBarComponent closeDialog={close} {...appBarProps} />
        {children}
      </Dialog>

      <OpenerComponent onClick={open} {...openerProps}>
        {openerChildren}
      </OpenerComponent>
    </>
  )
}

export default FullScreenDialog
