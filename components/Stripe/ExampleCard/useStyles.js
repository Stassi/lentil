import { makeStyles } from '@material-ui/core'
import brandSafeTopPadding from '../../../src/brandLogo/brandSafeTopPadding'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  buttonProgress: {
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
    position: 'absolute',
    top: '50%'
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  footer: {
    marginTop: theme.spacing(1)
  },
  media: {
    height: 0,
    ...brandSafeTopPadding
  },
  root: {
    marginTop: theme.spacing(3)
  }
}))

export default useStyles
