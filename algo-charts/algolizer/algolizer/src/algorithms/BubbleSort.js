import React, { Component } from 'react';
import Bar from '../user-interface/Bar';

class BubbleSort extends Component {

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
    
    sortArray = () => {
        console.log(this.state.data);
        debugger;
        var _data = [...this.state.data];
        var length = _data.length;
        var i = 0; var j = 0;
        var intr = setInterval(() => {
            if (i < length) {
                if (j < length - i - 1) {

                    let comparisonColors = [...this.state.color];

                    if (_data[j] > _data[j + 1]) {
                        var temp = _data[j];
                        _data[j] = _data[j + 1];
                        _data[j + 1] = temp;
                    }
                    console.log("Setting state");
                    
                    this.setState({
                        data: _data,
                        color: comparisonColors
                    }, () => {
                        comparisonColors[j] = 'red';
                        comparisonColors[j + 1] = 'red';

                        this.setState({
                            color: comparisonColors
                        }, () => {
                            comparisonColors[j] = 'green';
                            comparisonColors[j + 1] = 'green';
                        });


                    });

                    j++;

                } else {
                    i++;
                    j = 0;
                }
            } else {
                this.setState({
                    colors: ["green", "green", "green"]
                })
                document.bgColor = "black";
                clearInterval(intr);
            }
        }, 5);
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

export default BubbleSort;