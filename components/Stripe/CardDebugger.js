import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import normalizeParameters from './normalizeStripeCard'
import stringifyBoolean from '../../src/utility/stringifyBoolean'

const useStyles = makeStyles({
  root: {
    overflowX: 'auto',
    width: '100%'
  },
  table: {
    minWidth: 220
  }
})

const CardDebugger = ({
  brand,
  errorCode,
  errorMessage,
  errorType,
  inputComplete: inputCompleteBool,
  inputEmpty: inputEmptyBool,
  postalCode
}) => {
  const {
    root: rootClass,
    table: tableClass
  } = useStyles()

  const [inputComplete, inputEmpty] = [
    inputCompleteBool,
    inputEmptyBool
  ].map(stringifyBoolean)

  const rows = [
    ['Brand', brand],
    ['Postal code', postalCode],
    ['Input complete', inputComplete],
    ['Input empty', inputEmpty],
    ['Error code', errorCode],
    ['Error message', errorMessage],
    ['Error type', errorType]
  ].map(([field, value]) => ({ field, value }))

  return (
    <Paper className={rootClass}>
      <Table className={tableClass}>
        <TableHead>
          <TableRow>
            <TableCell>
              Field
            </TableCell>
            <TableCell align='right'>
              Value
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ field, value }) => (
            <TableRow key={field}>
              <TableCell component='th' scope='row'>
                {field}
              </TableCell>
              <TableCell align='right'>
                {value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default normalizeParameters(CardDebugger)
