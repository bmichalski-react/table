import React from 'react'

export default (props) => {
  const Table = props.Table
  const BeforeTableLayout = props.BeforeTableLayout
  const AfterTableLayout = props.AfterTableLayout

  if (props.overrideTable) {
    return (
      <div className="table-wrapper">
        {props.overrideTableWith}
      </div>
    )
  } else if (props.overrideTableInnerAndAfterTableLayout) {
    return (
      <div className="table-wrapper">
        <BeforeTableLayout store={props.store}></BeforeTableLayout>
        {props.overrideTableInnerAndAfterTableLayoutWith}
      </div>
    )
  } else {
    return (
      <div className="table-wrapper">
        <BeforeTableLayout store={props.store}></BeforeTableLayout>
        <Table store={props.store}></Table>
        <AfterTableLayout store={props.store}></AfterTableLayout>
      </div>
    )
  }
}