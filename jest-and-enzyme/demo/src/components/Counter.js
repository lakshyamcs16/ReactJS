import React, { useState } from 'react'

export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            error: false
        }
    }

    handleDecrement = () => {
        if(this.state.counter === 0) {
            this.setState({
                error: true
            });
            return;
        }

        this.setState((prevState) => {
            return {
                counter: prevState.counter - 1,
                error: false
            }
        });
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} data-test="component-counter">
                <h1 data-test="component-counter-value">{this.state.counter}</h1>
                {this.state.error && <h2 data-test="counter-error">Counter cannot be less than 0</h2>}
                <button onClick={() => this.setState(state => ({ counter: state.counter + 1, error: false }))} data-test="increment-button">Increment</button>
                <button onClick={this.handleDecrement} data-test="decrement-button">Decrement</button>
            </div>
        )
    }
}
