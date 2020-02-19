import React, { Component } from 'react';
import CurrencyEditor from './FilterEditors/CurrencyEditor';
import FilterIcon from './FilterEditors/FilterIcon';
import Paper from '@material-ui/core/Paper';
import {
    SelectionState,
    IntegratedSelection,
    TreeDataState,
    CustomTreeData,
    SortingState,
    IntegratedSorting,
    SearchState,
    IntegratedFiltering,
    FilteringState,
    DataTypeProvider
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    TableTreeColumn,
    TableSelection,
    TableColumnResizing,
    SearchPanel,
    DragDropProvider,
    TableColumnReordering,
    TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';

const URL = "https://private-1a09f-analytics43.apiary-mock.com/document/longshort/summary";

const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
    return childRows.length ? childRows : null;
};

const compareNumbers = (a, b) => {
    return a - b;
}
class FSGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [],
            selection: [],
            tableColumnExtensions: [{ columnName: 'Name', width: 300 }],
            defaultColumnWidths: [{ columnName: 'Name', width: 300 },
            { columnName: 'FY 2015', width: 200 },
            { columnName: 'FY 2016', width: 200 },
            { columnName: 'FY 2017', width: 200 },
            { columnName: 'FY 2018', width: 200 },
            { columnName: 'FY 2019', width: 200 }
            ],
            integratedSortingColumnExtensions: [{ columnName: 'FY 2015', compare: compareNumbers }],
            defaultColumnOrder: ['Name', 'FY 2015', 'FY 2016', 'FY 2017', 'FY 2018', 'FY 2019'],
            currencyColumns: ['FY 2015', 'FY 2016', 'FY 2017', 'FY 2018', 'FY 2019'],
            currencyFilterOperations: [
                'equal',
                'notEqual',
                'greaterThan',
                'greaterThanOrEqual',
                'lessThan',
                'lessThanOrEqual',
            ],
            pageSizes: [5, 10, 15, 0],
            defaultExpandedRowIds: [0],
            searchValue: ''
        }
    }

    setSelection = (select) => {
        this.setState({
            selection: select
        })
    }

    setSearchValue = (val) => {
        this.setState({
            searchValue: val
        })
    }

    componentDidMount() {
        fetch(URL)
            .then(e => e.json())
            .then(res => {
                this.setState({
                    rows: res.documents[0].data,
                    columns: [
                        { name: 'Name' },
                        { name: 'FY 2015' },
                        { name: 'FY 2016' },
                        { name: 'FY 2017' },
                        { name: 'FY 2018' },
                        { name: 'FY 2019' }
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
                        <SortingState
                            defaultSorting={[{ columnName: 'Name', direction: 'asc' }]}
                        />
                        <IntegratedSorting columnExtensions={this.state.integratedSortingColumnExtensions} />
                        <SearchState
                            value={this.state.searchValue}
                            onValueChange={this.setSearchValue}
                        />
                        <TreeDataState defaultExpandedRowIds={this.state.defaultExpandedRowIds} />
                        <CustomTreeData
                            getChildRows={getChildRows}
                        />

                        <DragDropProvider />
                        <DataTypeProvider
                            for={this.state.currencyColumns}
                            availableFilterOperations={this.state.currencyFilterOperations}
                            editorComponent={CurrencyEditor}
                        />
                        <FilteringState defaultFilters={[]} />
                        <IntegratedFiltering />

                        <Table
                            columnExtensions={this.state.tableColumnExtensions}
                        />

                        <SelectionState
                            selection={this.state.selection}
                            onSelectionChange={this.setSelection}
                        />
                        <IntegratedSelection />
                        <TableSelection
                            selectByRowClick
                            highlightRow
                            showSelectionColumn={true}
                        />
                        <TableColumnReordering defaultOrder={this.state.defaultColumnOrder} />
                        <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} />
                        <TableHeaderRow showSortingControls />
                        <TableFilterRow
                            showFilterSelector
                            iconComponent={FilterIcon}
                        />
                        <Toolbar />
                        <SearchPanel />
                        <TableTreeColumn
                            for="Name"
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