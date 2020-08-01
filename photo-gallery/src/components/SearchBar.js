import React, { useState } from 'react';
import { connect } from "react-redux";

function SearchBar(props) {

    let [search_text, set_search_text] = useState(props.search);
    return (
        <div id="search-bar">
            <input 
                id="query"
                type="text" 
                value={search_text} 
                onChange={(e) => set_search_text(e.target.value)}
                onKeyPress={(e) => props.handleSearch(e, search_text)}
            ></input>
            <button
                onClick={(e) => props.handleSearch(e, search_text)}
            >Go</button>
        </div>
    );
}

const mapStateToProps = state => ({
    search: state.gallery_reducer.search
});


export default connect(mapStateToProps, null)(SearchBar);
