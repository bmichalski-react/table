import React from 'react'
import Table from '../Presentational/Table'
import TableHead from '../Container/ContainerTableHead'
import TableBody from '../Container/ContainerTableBody'

export default (props) => {
  const head = props.head

  const renderBodys = () => {
    return props.bodys.map((body, i) => {
      return (
        <TableBody key={i} rows={body.rows} props={body.props} />
      )
    })
  }

  return (
    <Table props={props.props}>
      <TableHead rows={head.rows} props={head.props} />
      {renderBodys()}
    </Table>
  )
}