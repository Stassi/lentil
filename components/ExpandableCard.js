import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
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
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  }
}))

const ExpandableCard = ({
  BodyContent,
  CollapsibleContent,
  PrimaryButton
}) => {
  const {
    expand: expandClass,
    expandOpen: expandOpenClass,
    media: mediaClass
  } = useStyles()

  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => { setExpanded(!expanded) }

  return (
    <Card>
      <CardMedia
        className={mediaClass}
        image='//via.placeholder.com/345x194?text=Example+media'
        title='Example media'
      />
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
