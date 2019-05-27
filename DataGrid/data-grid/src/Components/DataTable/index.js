import React from 'react';
import './datatable.css';

export default class DataTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      className: props.className,
      headers: props.headers,
      data: props.data,
      pagedData: props.data,
      sortby: null,
      descending: null,
      search: false,
      pageLength: this.props.pagination.pageLength || 5,
      currentPage: 1
    }

    this.keyField = props.keyField || "id";
    this.noData = props.noData || "No records found!";
    this.width = props.width || "100%";

    this.pagination = this.props.pagination || {};

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
              ref={(th) => this[cleanTitle] = th}
              style={{width: width}}
              data-col={cleanTitle}>
              <span draggable data-col={cleanTitle} className="header-cell">
                {title}
              </span>
          </th>
        );
    });

    return headerView;
  }//renderTableHeader

  renderContent = () => {
    let {headers} = this.state;
    let data = this.pagination ? this.state.pagedData : this.state.data;

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

            if(this.props.edit) {
                if(header.dataType && (header.dataType === "number" || header.dataType === "string") &&
                   header.accessor !== this.keyField) {
                     if(edit && edit.row === rowIdx && edit.cell === index) {
                       content = (
                         <form onSubmit={this.onUpdate}>
                          <input type="text" defaultValue={content} onKeyUp={this.onFormReset} />
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
        });

        return (
              <tr key={rowIdx}>
                {tds}
              </tr>
        );
    });

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

          <thead>
              <tr>
                  {headerView}
              </tr>
          </thead>
          <tbody onDoubleClick={this.onShowEditor}>
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
  onUpdate = (e) => {
    e.preventDefault();
    let input = e.target.firstChild;
    let header = this.state.headers[this.state.edit.cell];
    let rowId = this.state.edit.rowId;

    this.setState({
      edit: null
    });

    this.props.onUpdate && this.props.onUpdate(header.accessor, rowId, input.value);
  }

  onFormReset = (e) => {
    if(e.keyCode === 27) {
      this.setState({
        eidt: null
      });
    }
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

  render() {
    return (
      <div className={this.props.className}>
        {this.renderTable()}
      </div>
    )
  }
}
