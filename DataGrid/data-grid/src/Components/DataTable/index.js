import React from 'react';
import ReactDOM from 'react-dom';
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
              ref={(th) => this.th = th}
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
    });

    return headerView;
  }//renderTableHeader

  renderContent = () => {
    let {headers} = this.state;
    let data = this.state.data;

    let contentView = data.map((row, rowIdx) => {
        let id = row[this.keyField];

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

          <thead onClick={this.onSort}>
              <tr>
                  {headerView}
              </tr>
          </thead>
          <tbody>
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

  render() {
    return (
      <div className={this.props.className}>
        {this.renderTable()}
      </div>
    )
  }
}
