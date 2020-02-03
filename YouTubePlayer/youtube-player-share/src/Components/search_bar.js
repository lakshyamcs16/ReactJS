import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term : ''
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange = (e) => {
        this.setState({
            term: e.target.value
        });
        this.props.onSearchTermChange(e.target.value);
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={this.onInputChange}></input>
            </div>
        )
    }
}

export default SearchBar;