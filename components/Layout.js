import React from 'react'
import Button from '@material-ui/core/Button'
import FullScreenDialog from './FullScreenDialog'
import SplitCardAppBar from './SplitCardAppBar'
import StaticAppBar from './StaticAppBar'
import DebugList from './DebugList'
import useElements from '../src/useElements'

const Layout = ({
  titleText,
  theme: {
    theme,
    toggleDarkOrLight
  }
}) => {
  const Elements = useElements()

  return (
    <>
      <StaticAppBar {...{ titleText, toggleDarkOrLight }} />

      <Elements>
        <FullScreenDialog
          AppBarComponent={SplitCardAppBar}
          AppBarComponentProps={{ theme }}
          OpenerComponent={Button}
          OpenerComponentProps={{
            children: 'Open full-screen dialog',
            color: 'secondary',
            variant: 'outlined'
          }}
        >
          <DebugList />
        </FullScreenDialog>
      </Elements>
    </>
  )
}

export default Layout
