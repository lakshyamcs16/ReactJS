import React, { useState } from 'react';

function SearchBar(props) {

    let [search_text, set_search_text] = useState('naruto');
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

export default SearchBar;
