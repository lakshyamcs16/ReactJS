import React from 'react';
import { connect } from "react-redux";


function Details(props) {
    return (
        <div className="details">
            <span>Requesting: </span><span className="url">{props.request_details.requested_url? <a href={props.request_details.requested_url}>{props.request_details.requested_url}</a> :  `API Request URL will appear here`}</span><br></br>
            <span>Time taken: </span><span>{props.request_details.time_taken}</span><br></br>
            {props.error && <span>Error: <span className="error">{props.error}</span></span>} 
        </div>
    );
}

const mapStateToProps = state => ({
    images: state.gallery_reducer.images,
    error: state.gallery_reducer.error,
    loading: state.gallery_reducer.loading,
    request_details: state.gallery_reducer.request_details
});

export default connect(mapStateToProps, null)(Details);
