import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  listItem: {
    marginTop: theme.spacing(1)
  }
}))

const ListItem = ({ ...props }) => {
  const { listItem: className } = useStyles()
  return (
    <li {...{ className }}>
      <Typography component='span' {...props} />
    </li>
  )
}

export default ListItem
