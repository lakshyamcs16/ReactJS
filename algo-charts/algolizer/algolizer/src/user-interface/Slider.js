import React, { Component } from 'react';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 30
        }
        this.handleChange = this.handleChange.bind(this);
        this.sliderRef = React.createRef();
    }
    
    handleChange (event) {
        this.setState({value: event.target.value});
        this.props.setSize(event.target.value);
    }

    render() {
        return (
            <input
                id="typeinp"
                type="range"
                min="1" max="100"
                value={this.state.value}
                onChange={this.handleChange}
                step="1"
                ref={this.sliderRef} />
        );
    }
}

export default Slider;