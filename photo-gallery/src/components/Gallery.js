import React, { useState } from 'react';
import { connect } from "react-redux";
import { fetchData, setData, setSearchQuery } from "../redux/Gallery/api.actions";
import SearchBar from './SearchBar';
import Content from './Content';

const Gallery = (props) => {
    let [rows, set_rows] = useState(0);
    let [cols] = useState(7);

    async function handleSearch(e, query) {
        if (e.key === 'Enter' || e.type === 'click') {
            props.setSearchQuery(query);
            let response = await props.fetchData({query, limit: 16, page: 1});
            if(response.success) {
                set_rows(Math.ceil(response.body.results.length / cols));
                props.setData(response.body.results);
            }
        }
    }

    return (
        <>
            <SearchBar handleSearch={handleSearch} />
            <Content rows={rows} cols={cols}/>
        </>
    );
}

const mapStateToProps = state => ({
    images: state.gallery_reducer.images,
    error: state.gallery_reducer.error,
    loading: state.gallery_reducer.loading,
    query: state.gallery_reducer.search
});

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (params) => dispatch(fetchData(params)),
        setData: (data) => dispatch(setData(data)),
        setSearchQuery: (query) => dispatch(setSearchQuery(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
