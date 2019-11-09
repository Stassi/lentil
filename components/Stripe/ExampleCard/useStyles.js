import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  root: {
    marginTop: theme.spacing(3)
  }
}))

export default useStyles
