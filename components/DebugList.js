import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const DebugList = () => (
  <List>
    <ListItem>
      <ListItemText
        primary='Phone ringtone'
        secondary='Titania'
      />
    </ListItem>

    <Divider />

    <ListItem>
      <ListItemText
        primary='Default notification ringtone'
        secondary='Tethys'
      />
    </ListItem>
  </List>
)

export default DebugList
