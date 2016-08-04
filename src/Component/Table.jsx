class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      errorLoadingData: false
    }

    this._updateStateFromRemoteSource(props.getData)
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      loading: true,
      errorLoadingData: false
    })

    this._updateStateFromRemoteSource(newProps.getData)
  }

  _updateStateFromRemoteSource(getData) {
    if (undefined !== this._promise) {
      this._promise.cancel()
    }

    this._promise = getData()

    this._promise.then((data) => {
      this._updateStateFromFetchedData(data)
    }).catch((err) => {
      this.setState({
        loading: false,
        errorLoadingData: true
      })

      throw err
    }).done()
  }

  _updateStateFromFetchedData(data) {
    this.setState({
      data: data,
      totalResult: data.info.totalFiltered,
      loading: false,
      errorLoadingData: false
    })
  }

  render() {
    if (undefined === this.state.totalResult) {
      return (
        <div>{this.props.loadingMessage}</div>
      )
    }

    if (this.state.errorLoadingData) {
      return (
        <div>{this.props.errorLoadingDataMessage}</div>
      )
    }

    return (
      <div className="table-wrapper">
        <div className="row">
          <div className="col-md-12">
            <Paginator
              totalResult={this.state.totalResult}
              currentPage={this.props.paginator.page}
              pageSize={this.props.paginator.pageSize}
              goToPage={this.props.paginator.goToPage.bind(this.props.paginator)}
              makeLink={this.props.paginator.makeLink.bind(this.props.paginator)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {(() => {
              if (this.state.loading) {
                return (
                  <div>{this.props.loadingMessage}</div>
                )
              }

              return (
                <MainTable
                  data={this.state.data.result}
                  renderCell={this.props.renderCell}
                  onCellClicked={this.props.onCellClicked}
                  emptyTableMessage={this.props.emptyTableMessage}
                  tableClassName={this.props.tableClassName}>
                  {this.props.children}
                </MainTable>
              )
            })()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Paginator
              totalResult={this.state.totalResult}
              currentPage={this.props.paginator.page}
              pageSize={this.props.paginator.pageSize}
              goToPage={this.props.paginator.goToPage.bind(this.props.paginator)}
              makeLink={this.props.paginator.makeLink.bind(this.props.paginator)}
              noPageSizeSelector
              noGoTo />
          </div>
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  emptyTableMessage: React.PropTypes.string.isRequired,
  errorLoadingDataMessage: React.PropTypes.string.isRequired,
  loadingMessage: React.PropTypes.string.isRequired,
  tableClassName: React.PropTypes.string.isRequired,
  paginator: React.PropTypes.shape({
    page: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    goToPage: React.PropTypes.func.isRequired,
    makeLink: React.PropTypes.func.isRequired
  }).isRequired,
  renderCell: React.PropTypes.func,
  onCellClicked: React.PropTypes.func
}

Table.defaultProps = {
  emptyTableMessage: 'No data to display with given parameters.',
  errorLoadingDataMessage: 'Error loading data.',
  loadingMessage: 'Loading data...',
  tableClassName: 'table table-bordered'
}
