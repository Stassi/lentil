import { makeStyles } from '@material-ui/core'
import brandSafeTopPadding from '../../../src/brandLogo/brandSafeTopPadding'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
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
