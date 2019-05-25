import React from 'react';
import './datatable.css';

export default class DataTable extends React.Component {
  render() {
    return (
      <div>{this.props.title}</div>
    )
  }
}
