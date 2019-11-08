import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  expand: {
    marginLeft: 'auto',
    transform: 'rotate(0deg)',
    transition: theme.transitions.create(
      'transform',
      { duration: theme.transitions.duration.shortest }
    )
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}))

const ExpandableCard = ({
  BodyContent,
  CollapsibleContent,
  Media,
  PrimaryButton
}) => {
  const {
    expand: expandClass,
    expandOpen: expandOpenClass
  } = useStyles()

  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => { setExpanded(!expanded) }

  return (
    <Card>
      {Media}

      <CardContent>
        {BodyContent}
      </CardContent>

      <CardActions disableSpacing>
        {PrimaryButton}
        <IconButton
          className={clsx(
            expandClass,
            { [expandOpenClass]: expanded }
          )}
          aria-expanded={expanded}
          aria-label='show more'
          onClick={handleExpandClick}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse
        in={expanded}
        timeout='auto'
        unmountOnExit
      >
        <CardContent>
          {CollapsibleContent}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ExpandableCard
