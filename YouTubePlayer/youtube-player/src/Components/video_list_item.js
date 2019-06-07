import React from 'react';

const VideoListItem = (props) => {
    const video = props.video;
    const onUserSelected = props.onUserSelected;
    const imgUrl = video.snippet.thumbnails.default.url;

    return (
        <li onClick={() => onUserSelected(video)} className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img className="media-object" alt={video.snippet.title} src={imgUrl}></img>
                </div>
                <div className="media-body">
                    <div className="media-heading">{video.snippet.title}</div>
                </div>
            </div>
        </li>
    );
}

export default VideoListItem;