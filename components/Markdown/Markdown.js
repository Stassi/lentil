import React from 'react'
import ReactMarkdown from 'markdown-to-jsx'
import Typography from '@material-ui/core/Typography'
import ListItem from './ListItem'
import Link from '../Link'

const options = {
  overrides: {
    a: {
      component: Link
    },
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4'
      }
    },
    h2: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h6'
      }
    },
    h3: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'subtitle1'
      }
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        paragraph: true,
        variant: 'caption'
      }
    },
    li: {
      component: ListItem
    },
    p: {
      component: Typography,
      props: {
        paragraph: true
      }
    }
  }
}

const Markdown = props => (<ReactMarkdown {...{ options }} {...props} />)

export default Markdown
