import React, { Component } from 'react';
import CurrencyEditor from './FilterEditors/CurrencyEditor';
import FilterIcon from './FilterEditors/FilterIcon';
import Paper from '@material-ui/core/Paper';
import '../../App.css';

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
    DataTypeProvider,
    SummaryState,
    IntegratedSummary
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    Toolbar,
    TableHeaderRow,
    TableTreeColumn,
    TableSelection,
    TableColumnResizing,
    TableSummaryRow,
    SearchPanel,
    DragDropProvider,
    TableColumnReordering,
    TableFilterRow
} from '@devexpress/dx-react-grid-material-ui';
import {
    SortableContainer,
    SortableHandle,
    SortableElement
  } from "react-sortable-hoc";

const alignment = {
    float: 'right'
}

const URL = "https://private-1a09f-analytics43.apiary-mock.com/document/longshort/summary";

const getChildRows = (row, rootRows) => {
    const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
    return childRows.length ? childRows : null;
};

const compareNumbers = (a, b) => {
    return a - b;
}

const CurrencyFormatter = ({ value }) => `${value}`;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

const DragHandle = SortableHandle(({ style }) => (
    <span style={{ ...style, ...{ cursor: "move" } }}>{"::::"}</span>
));

class FSGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            columns: [
                { name: "drag", title: ""},
                { name: 'Name' },
                { name: 'FY 2015' },
                { name: 'FY 2016' },
                { name: 'FY 2017' },
                { name: 'FY 2018' },
                { name: 'FY 2019' }
            ],
            selection: [],
            tableColumnExtensions: [{ columnName: 'Name', width: 300 }],
            defaultColumnWidths: [{ columnName: 'drag', width: 100 },
                                { columnName: 'Name', width: 300 },
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
            totalSummaryItems: [ {columnName: 'FY 2015', type: 'sum' }],
            treeSummaryItems: [ {columnName: 'FY 2015', type: 'sum' }],
            pageSizes: [5, 10, 15, 0],
            defaultExpandedRowIds: [0,5],
            searchValue: '',
            swapIdx: []
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

    onSortEnd = ({ oldIndex, newIndex }) => {
        console.log(oldIndex+": "+newIndex);

        let rP = this.state.rows;
        let temp = rP[oldIndex];
        rP[oldIndex] = rP[newIndex];
        rP[newIndex] = temp;

        this.setState({
            swapIdx: [oldIndex, newIndex],
            rows: rP
        })
    }

    TableCell = ({ value, ...restProps }) => (
        <Table.Cell {...restProps}>
            {restProps.column.name === "drag" ? <DragHandle /> : <span style={alignment} className="numbers" >{value}</span> }
        </Table.Cell>
    );

    parseData = (data) => {
        debugger;
        return data.map((v) => {
            var currObj = {};
            for(var key in v) {
                if(key.toUpperCase().startsWith("FY")) {
                    var vv = 0;
                    if(!isNaN(v[key])) {
                        vv = parseInt(v[key]);
                    }
                    currObj[key] = vv;
                }else{
                    currObj[key] = v[key];
                }
            }
            return currObj;
        })
    }

    componentDidMount() {
        fetch(URL)
            .then(e => e.json())
            .then(res => {
                this.setState({
                    rows: this.parseData(res.documents[0].data),
                    columns: this.state.columns
                });
            })
    }

    render() {
        console.log('Render');
        
        return (
            <div>
                <Paper>
                        <Grid
                            rows={this.state.rows}
                            columns={this.state.columns}
                        >
                        <CurrencyTypeProvider
                            for={this.state.currencyColumns}
                        />
                        <SortingState
                            defaultSorting={[{ columnName: 'Name', direction: 'asc' }]}
                        />
                        <IntegratedSorting columnExtensions={this.state.integratedSortingColumnExtensions} />
                        <SearchState
                            value={this.state.searchValue}
                            onValueChange={this.setSearchValue}
                        />
                        <TreeDataState defaultExpandedRowIds={this.state.defaultExpandedRowIds} />
                        <SummaryState
                            totalItems={this.state.totalSummaryItems}
                            treeItems={this.state.treeSummaryItems}
                        />
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
                            cellComponent={this.TableCell}
                            rows={this.setRows}
                            bodyComponent={({ row, ...restProps }) => {
                                debugger;
                                
                                let rP = {...restProps};
                                rP = rP.children;
                                let temp = rP[this.state.swapIdx[0]];
                                rP[this.state.swapIdx[0]] = rP[this.state.swapIdx[1]];
                                rP[this.state.swapIdx[1]] = temp;

                                const TableBody = SortableContainer(Table.TableBody);
                                return (
                                  <TableBody {...restProps} onSortEnd={this.onSortEnd} useDragHandle />
                                );
                              }}
                              rowComponent={({ row, ...restProps }) => {
                                debugger;
                                const TableRow = SortableElement(Table.Row);
                                return <TableRow {...restProps} index={this.state.rows.indexOf(row)} />;
                              }}
                        />

                        <SelectionState
                            selection={this.state.selection}
                            onSelectionChange={this.setSelection}
                        />
                        <IntegratedSelection />
                        <TableSelection
                            // selectByRowClick
                            // highlightRow
                            showSelectionColumn={true}
                        />
                        <TableColumnReordering defaultOrder={this.state.defaultColumnOrder} />
                        <TableColumnResizing defaultColumnWidths={this.state.defaultColumnWidths} />
                        <IntegratedSummary />
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
                        <TableSummaryRow />

                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default FSGrid;