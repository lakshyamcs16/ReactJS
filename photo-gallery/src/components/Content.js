import React from 'react';
import { connect } from "react-redux";

const Content = (props) => {
    function build_content() {
        console.log(props.rows)
        
        let result = [];
        let index = 0;
        
        for (let r_idx = 0; r_idx < props.rows && index < props.images.length; r_idx++) {
            let col_res = [];
            for (let c_idx = 0; c_idx < props.cols && index < props.images.length; c_idx++) {
                col_res.push(<div className="column" key={props.images[index].mal_id}>
                    <div className="result-image">
                        <img src={props.images[index].image_url} alt={props.images[index].description} />
                    </div>
                    <div className="title">
                        <span>{props.images[index].title}</span>
                    </div>
                </div>);
                index++;
            }
            result.push(<div className="row" key={index}>{col_res}</div>);
        }
        console.log(result)
        return result;
    }

return (
    props.images &&
    <div className="table-content">
        <div className="gallery-container">
            {
                build_content()
            }
        </div>
    </div>
);
}

const mapStateToProps = state => ({
    images: state.gallery_reducer.images,
    error: state.gallery_reducer.error,
    loading: state.gallery_reducer.loading
});


export default connect(mapStateToProps, null)(Content);