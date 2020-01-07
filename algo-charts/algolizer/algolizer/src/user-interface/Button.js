import React, { Component } from 'react';

class SortButton extends Component {
    render() {
        return (
            <input
                id="buttonSort"
                type="button"
                value="Sort!"
                onClick={this.props.handleSubmit}
            />
        );
    }
}

export default SortButton;