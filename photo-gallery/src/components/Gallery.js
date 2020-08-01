import React, { useState } from 'react';
import { connect } from "react-redux";
import { fetchData, setData, setSearchQuery, setMoreData, setPageNumber, setError, setLoading } from "../redux/Gallery/api.actions";
import CONSTANTS  from '../utils/Constants';
import SearchBar from './SearchBar';
import Content from './Content';
import Details from './Details';
import { ReactComponent as Loader } from '../assets/loader.svg';

const Gallery = (props) => {
    let [rows, set_rows] = useState(0);
    let [cols] = useState(6);
    let [last_page, set_last_page] = useState(0);
    function handleError(message) {
        props.setError(message);
    }

    async function handleSearch(e, query) {
        if (e.key === 'Enter' || e.type === 'click') {
            props.setLoading(true);
            props.setSearchQuery(query);
            if(query.length < 1) {
                props.setError(CONSTANTS.NO_TEXT);
            }else{
                let response = await props.fetchData({query, limit: 24, page: 1});
                if(response.success) {
                    set_rows(Math.ceil(response.body.results.length / cols));
                    props.setData(response.body.results);
                    props.setPageNumber(1);
                    console.log(":LLASATT" + response.body.last_page);
                    set_last_page(response.body.last_page);
                }else{
                    handleError(response.body.message);
                }
            }
            props.setLoading(false);
        }
    }

    async function handleMore() {
        let { query } = props;
        let pg = props.page + 1;
        props.setLoading(true);
        let response = await props.fetchData({query, limit: 24, page: pg});
        if(response.success) {
            set_rows(rows + Math.ceil(response.body.results.length / cols));
            props.setMoreData(response.body.results);
            props.setPageNumber(pg);
        }else{
            handleError(response.body.message);
        }
        props.setLoading(false);
    }

    return (
        <>
            <div className="headers">
                <SearchBar handleSearch={handleSearch} />
                <Details />
            </div>
            {!props.error && <Content rows={rows} cols={cols}/>}
            {!props.loading && props.images && props.images.length>0 && props.page < last_page && <span className="more" onClick={() => handleMore()}>More</span>}
            {props.loading && <Loader className="loader"/>}
        </>
    );
}

const mapStateToProps = state => ({
    images: state.gallery_reducer.images,
    error: state.gallery_reducer.error,
    loading: state.gallery_reducer.loading,
    query: state.gallery_reducer.search,
    page: state.gallery_reducer.page_number
});

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (params) => dispatch(fetchData(params)),
        setData: (data) => dispatch(setData(data)),
        setSearchQuery: (query) => dispatch(setSearchQuery(query)),
        setMoreData: (data) => dispatch(setMoreData(data)),
        setPageNumber: (data) =>  dispatch(setPageNumber(data)),
        setError: (data) =>  dispatch(setError(data)),
        setLoading: (data) =>  dispatch(setLoading(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
