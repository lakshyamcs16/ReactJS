import React from 'react';
import ReactDOM from 'react-dom';
import './datatable.css';

export default class DataTable extends React.Component {
  _preSearchData = null

  constructor(props) {
    super(props);

    this.state = {
      className: props.className,
      headers: props.headers,
      data: props.data,
      pagedData: props.data,
      sortby: null,
      descending: null,
      search: true,
    }

    this.keyField = props.keyField || "id";
    this.noData = props.noData || "No records found!";
    this.width = props.width || "100%";
  }//constructor ended

  renderTableHeader = () => {
    let {headers} = this.state;
    headers.sort((a, b) => {
      if(a.index > b.index)
        return 1;
      return -1;
    });

    let headerView = headers.map((header, index) => {
        let title = header.title;
        let cleanTitle = header.accessor;
        let width = header.width;

        if(this.state.sortby === index) {
          title += this.state.descending ? '\u2193' : '\u2191';
        }

        return (
          <th key={cleanTitle}
              ref={(th) => {this[cleanTitle] = th}}
              style={{width: width}}
              data-col={cleanTitle}
              onDragStart={(e) => this.onDragStart(e, index)}
              onDragOver={this.onDragOver}
              onDrop={(e) => {this.onDrop(e, index)}}>
              <span draggable data-col={cleanTitle} className="header-cell">
                {title}
              </span>
          </th>
        );
    }, this);

    return headerView;
  }//renderTableHeader

  renderContent = () => {
    let {headers} = this.state;
    let data = this.state.data;

    let contentView = data.map((row, rowIdx) => {
        let id = row[this.keyField];
        let edit = this.state.edit;
        let tds = headers.map((header, index) => {
            let content = row[header.accessor];
            let cell = header.cell;

            if(cell) {
              if(typeof (cell) === "function") {
                content = cell(row);
              }else if(typeof (cell) === "object") {
                if (cell.type === "image" && content) {
                  content = <img style={cell.style} src={content} alt="profile goes here"/>
                }
              }
            }
            if (this.props.edit) {

              if (header.dataType && (header.dataType === "number" ||
                  header.dataType === "string") &&
                  header.accessor !== this.keyField) {
                  if (edit && edit.row === rowIdx && edit.cell === index) {
                      content = (
                          <form onSubmit={this.onUpdate}>
                              <input type="text" defaultValue={content}
                                  onKeyUp={this.onFormReset} />
                          </form>
                      );
                  }

              }
            }
            return (
                  <td key={index} data-id={id} data-row={rowIdx}>
                    {content}
                  </td>
            );
        }, this);

        return (
              <tr key={rowIdx}>
                {tds}
              </tr>
        );
    }, this);

    return contentView;
  }//renderContent ended

  renderTable = () => {
    let title = this.props.title || "Datatable";
    let headerView = this.renderTableHeader();
    let contentView = this.state.data.length > 0 ? this.renderContent() : this.renderNoData();

    return (
      <table className="data-inner-table">
        <caption className="data-table-caption">
          {title}
          </caption>

          <thead onClick={this.onSort}>
              <tr>
                  {headerView}
              </tr>
          </thead>
          <tbody onDoubleClick={this.onShowEditor}>
            {this.renderSearch()}
            {contentView}
          </tbody>
      </table>
    )

  }//renderTable ended

  renderNoData = () => {
    return (
        <tr>
            <td colSpan={this.props.headers.length}>
                {this.noData}
            </td>
        </tr>
    );
  }

  renderToolbar = () => {
    return (
        <div className="toolbar">
            <button onClick={this.onToggleSearch}>
                Search
            </button>
        </div>

    );
  }

  renderSearch = () => {
    let { search, headers } = this.state;
    if (!search) {
        return null;
    }

    let searchInputs = headers.map((header, idx) => {

        // Get the header ref.
        let hdr = this[header.accessor];
        let inputId = 'inp' + header.accessor;

        return (
            <td key={idx}>
                <input type="text"
                    ref={(input) => this[inputId] = input}
                    style={{
                        width: hdr.clientWidth - 17 + "px"
                    }}
                    data-idx={idx}
                />
            </td>
        );

    }, this);

    return (
        <tr onChange={this.onSearch}>
            {searchInputs}
        </tr>
    );
  }

  onDragStart = (e, source) => {
      e.dataTransfer.setData('text/plain', source);
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, target) => {
    e.preventDefault();
    let headers = [...this.state.headers];
    let source = e.dataTransfer.getData('text/plain');
    let sourceHeader = headers[source];
    let targetHeader = headers[target];

    let temp = sourceHeader.index;
    sourceHeader.index = targetHeader.index;
    targetHeader.index = temp;

    this.setState({
      headers
    });
  }

  onSort = (e) => {
      let data = this.state.data.slice(); // Give new array
      let colIndex = ReactDOM.findDOMNode(e.target).parentNode.cellIndex;
      let colTitle = e.target.dataset.col;

      let descending = !this.state.descending;

      data.sort((a, b) => {
          let sortVal = 0;
          if (a[colTitle] < b[colTitle]) {
              sortVal = -1;
          } else if (a[colTitle] > b[colTitle]) {
              sortVal = 1;
          }
          if (descending) {
              sortVal *= -1;
          }
          return sortVal;
      });
      this.setState({
          data,
          sortby: colIndex,
          descending
      });
  }
  onShowEditor = (e) => {
    let id = e.target.dataset.id;
    this.setState({
        edit: {
            row: parseInt(e.target.dataset.row, 10),
            rowId: id,
            cell: e.target.cellIndex
        }
    })
  }
  onUpdate = (e) => {
    e.preventDefault();
    let input = e.target.firstChild;
    let header = this.state.headers[this.state.edit.cell];
    let rowId = this.state.edit.rowId;

    this.setState({
        edit: null
    });

    this.props.onUpdate &&
        this.props.onUpdate(header.accessor, rowId, input.value);
  }

  onFormReset = (e) => {
      if (e.keyCode === 27) {  // ESC key
          this.setState({
              edit: null
          });
      }
  }

  onToggleSearch = (e) => {
    if (this.state.search) {
        this.setState({
            data: this._preSearchData,
            search: false
        });
        this._preSearchData = null;
    } else {
        this._preSearchData = this.state.data;
        this.setState({
            search: true
        });
    }
  }

  onSearch = (e) => {
    let { headers } = this.state;
    // Grab the index of the target column

    // Get the target column
    let data = this._preSearchData;

    // Filter the records
    let searchData = data.filter((row) => {
        let show = true;

        for (let i = 0; i < headers.length; i++) {
            let fieldName = headers[i].accessor;
            let fieldValue = row[fieldName];
            let inputId = 'inp' + fieldName;
            let input = this[inputId];
            if (!fieldValue === '') {
                show = true;
            } else {
                show = fieldValue.toString().toLowerCase().indexOf(input.value.toLowerCase()) > -1;
                if (!show) break;
            }
        }
        return show;
        //return row[targetCol].toString().toLowerCase().indexOf(needle) > -1;
    });

    // UPdate the state
    this.setState({
        data: searchData,
        pagedData: searchData,
        totalRecords: searchData.length
    }, () => {
        if (this.pagination.enabled) {
            this.onGotoPage(1);
        }
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderToolbar()}
        {this.renderTable()}
      </div>
    )
  }
}
