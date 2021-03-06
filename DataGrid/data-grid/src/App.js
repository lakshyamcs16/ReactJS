import React, { Component } from 'react';
import './App.css';
import DataTable from './Components/DataTable'
//https://www.youtube.com/watch?v=56YBRbPsy9o 20:54
//https://github.com/rajeshpillai/udemy-react-datatable

class App extends Component {
  constructor(props) {
    super(props);
    let model = {
      headers: [
        {title: "Id", accessor: "id", index: 0},
        {title: "Profile", accessor: "profile", width: 80, index: 1, cell: {
            type: "image",
            style: {
              "width": "50px"
            }
          }
        },
        {title: "Name", accessor: "name", width: 300, index: 2, dataType: "string"},
        {title: "Age", accessor: "age", index: 3, dataType: "number"},
        {title: "Qualification", accessor: "qualification", index: 4, dataType: "string"},
        {title: "Rating", accessor: "rating", index: 5, width: 200, cell: row => (
            <div className="rating">
              <div style={{
                backgroundColor: "lightSkyBlue",
                textAlign: "center",
                height: "1.9em",
                width: (row.rating/5)*201 + "px",
                margin: "3px 0 4px 0"
              }}>{row.rating}</div>
            </div>
        )},
      ],

      data: [
          { id: 1, name: "a", age: 29, qualification: "B.Com", rating: 3, profile: "https://png.icons8.com/nolan/50/000000/user.png" },
          { id: 2, name: "b", age: 35, qualification: "B.Sc", rating: 5, profile: "https://png.icons8.com/nolan/50/000000/user.png" },
          { id: 3, name: "c", age: 42, qualification: "B.E", rating: 3, profile: "https://png.icons8.com/nolan/50/000000/user.png" },
        ]
    }

    for (var i = 4; i <= 20; i++) {
        model.data.push({
          id: i,
          name: "name " + i,
          age: i + 18,
          qualification: "Graduate",
          rating: (i % 2 ? 3 : 4),
          profile: "https://png.icons8.com/dotty/50/000000/cat-profile.png"
        })
      }

    this.state = model;
  }

  onUpdateTable = (field, id, value) => {
    let data = this.state.data.slice();
    let updateRow = data.find((d) => {
      return d["id"] === parseInt(id, 10);
    });

    updateRow[field] = value;

    this.setState({
      edit: null,
      data: data
    });
  }

  render() {
    return (
      <div className="App">
        <DataTable className="data-table"
          title="USER PROFILES"
          keyField="id"
          pagination={{
            enabled: true,
            pageLength: 5,
            type: "long"
          }}
          edit={true}
          width="100%"
          headers={this.state.headers}
          data={this.state.data}
          noData="No Records"
          onUpdate={this.onUpdateTable} />
      </div>
    );
  }
}

export default App;
