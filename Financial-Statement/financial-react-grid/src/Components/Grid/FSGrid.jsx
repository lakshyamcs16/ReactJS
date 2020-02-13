import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  SelectionState,
  PagingState,
  IntegratedPaging,
  IntegratedSelection,
  TreeDataState,
  CustomTreeData
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableSelection,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

const URL = "https://private-1a09f-analytics43.apiary-mock.com/document/longshort/summary";

const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
    return childRows.length ? childRows : null;
};

class FSGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [],
            selection: [],
            tableColumnExtensions: [ { columnName: 'name', width: 300 } ]
        }
    }

    setSelection = (select) => {
        this.setState({
            selection: select
        })
    }

    componentDidMount() {
        fetch(URL)
        .then(e => e.json())
        .then(res => {
            this.setState({
                rows: res.documents[0].data,
                columns: [  { name: 'id'},
                            { name: 'name'},
                            { name: 'FY 2015'},
                            { name: 'FY 2016'},
                            { name: 'FY 2017'},
                            { name: 'FY 2018'},
                            { name: 'FY 2019'}
                        ]
            });
        })
    }

    render() {
        return (
            <div>
               <Paper>
                    <Grid
                    rows={this.state.rows}
                    columns={this.state.columns}
                    >
                    <TreeDataState />
                    <CustomTreeData
                    getChildRows={getChildRows}
                    />
                    <Table
                    columnExtensions={this.state.tableColumnExtensions}
                    />
                    <TableHeaderRow />
                    <TableTreeColumn
                    for="name"
                    />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default FSGrid;





/*

Sample tree data

0: {id: 0, parentId: null, gender: "Female", name: "Barbara", city: "Tokyo", …}
1: {id: 1, parentId: 0, gender: "Female", name: "Betty", city: "Chicago", …}
2: {id: 2, parentId: 0, gender: "Male", name: "Thomas", city: "New York", …}
3: {id: 3, parentId: 0, gender: "Male", name: "John", city: "Paris", …}
4: {id: 4, parentId: 0, gender: "Female", name: "Maria", city: "Las Vegas", …}
5: {id: 5, parentId: 0, gender: "Male", name: "John", city: "Austin", …}
6: {id: 6, parentId: 0, gender: "Male", name: "Richard", city: "Las Vegas", …}
7: {id: 7, parentId: 1, gender: "Male", name: "William", city: "New York", …}
8: {id: 8, parentId: 2, gender: "Female", name: "Maria", city: "Los Angeles", …}
9: {id: 9, parentId: 1, gender: "Male", name: "James", city: "Chicago", …}
10: {id: 10, parentId: 3, gender: "Female", name: "Maria", city: "Los Angeles", …}
11: {id: 11, parentId: 1, gender: "Female", name: "Sharon", city: "Tokyo", …}
12: {id: 12, parentId: 1, gender: "Male", name: "William", city: "London", …}
13: {id: 13, parentId: 0, gender: "Male", name: "John", city: "New York", …}
14: {id: 14, parentId: 0, gender: "Male", name: "David", city: "Tokyo", …}
15: {id: 15, parentId: 1, gender: "Female", name: "Sandra", city: "Tokyo", …}
16: {id: 16, parentId: 6, gender: "Male", name: "John", city: "New York", …}
17: {id: 17, parentId: 0, gender: "Male", name: "John", city: "Paris", …}
18: {id: 18, parentId: 2, gender: "Male", name: "William", city: "Paris", …}
19: {id: 19, parentId: 8, gender: "Male", name: "David", city: "Las Vegas", …}

*/