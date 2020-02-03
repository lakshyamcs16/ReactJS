import React from 'react';

const VideoDetail = (props) => {
    const video = props.video;

    if(!video) {
        return <div>Loading. . . </div>
    }

    return (
        <div className="video-detail col-md-8">
            <div id="player">
            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div>{video.snippet.description}</div>
            </div>
        </div>
    );
}

export default VideoDetail;