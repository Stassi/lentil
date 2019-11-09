import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const PureCardDebugger = ({
  rows,
  classes: {
    root: rootClass,
    table: tableClass
  }
}) => (
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

export default PureCardDebugger
