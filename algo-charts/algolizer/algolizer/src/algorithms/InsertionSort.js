import React, { Component } from 'react';
import Bar from '../user-interface/Bar';

class InsertionSort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            color: props.color
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        this.setState({data: this.props.data,
            color: this.props.color});
  
    }

    componentDidMount() {
        console.log("Did");
        this.sortArray();
    }

    componentWillUpdate() {
        if(this.props.sortNow) {
            this.sortArray();
        }
    }
    
    // int n = arr.length; 
    // for (int i = 1; i < n; ++i) { 
    //     int key = arr[i]; 
    //     int j = i - 1; 

    //     /* Move elements of arr[0..i-1], that are 
    //        greater than key, to one position ahead 
    //        of their current position */
    //     while (j >= 0 && arr[j] > key) { 
    //         arr[j + 1] = arr[j]; 
    //         j = j - 1; 
    //     } 
    //     arr[j + 1] = key; 
    // } 


    sortArray = () => {
        console.log(this.state.data);
        this.props.setSortState(false);
        var i = 1; var j = 0;
        var intr = setInterval(() => {
            var _data = [...this.state.data];
            var length = _data.length;
            if (i < length) {
                var key = _data[i];
                j = i - 1;
                if (j >= 0 && _data[j] > key) {

                    let comparisonColors = [...this.state.color];
                    _data[j + 1] = _data[j]; 
                    
                    comparisonColors[i] = 'red';
                    comparisonColors[j] = 'red';

                    this.setState({
                        data: _data,
                        color: comparisonColors
                    });

                    j = j - 1;

                } else {
                    _data[j + 1] = key; 
                    let comparisonColors = [...this.state.color];
                    comparisonColors[i] = 'red';
                    comparisonColors[j+1] = 'red';
                    this.setState({
                        data: _data,
                        color: comparisonColors
                    });
                    i++;
                }
            } else {
                this.setState({
                    colors: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"]
                })
                clearInterval(intr);
            }
        }, 50);
    }

    render() {

        let currentDataArr = this.state.data;
        currentDataArr = currentDataArr.map((element, index) => {
            return <Bar key={index} id={element} color={this.state.color[index]} width={"20px"} height={element * 30 + "px"}></Bar>
        });
        return (
            <div className="container">
                {currentDataArr}
            </div>
        );
    }
}

export default InsertionSort;