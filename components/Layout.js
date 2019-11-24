import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import GitHubIcon from './GitHubIcon'
import useElements from '../src/useElements'
import ElementsQuad from './ElementsQuad'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
})

const Layout = ({
  titleText,
  theme: { toggleDarkOrLight }
}) => {
  const {
    root: rootClass,
    title: titleClass
  } = useStyles()

  const { Component: Elements } = useElements()

  return (
    <div className={rootClass}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={titleClass} variant='h6'>
            {titleText}
          </Typography>

          <IconButton
            color='inherit'
            onClick={(ev) => {
              ev.preventDefault()
              toggleDarkOrLight()
            }}
          >
            <Brightness7Icon />
          </IconButton>

          <IconButton color='inherit' href='https://github.com/Stassi/lentil'>
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ElementsQuad {...{ Elements }} />
    </div>
  )
}

export default Layout
