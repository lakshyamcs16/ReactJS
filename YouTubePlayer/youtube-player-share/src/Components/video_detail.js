import React,  { useState, useEffect } from 'react';
const lyrics = require('4lyrics');


const VideoDetail = (props) => {
    const video = props.video;
    const [lyric, setLyric] = useState({lyrics: null});

    useEffect(()=>{
        lyrics.lyricslive.getURL('up&up')
            .then(r => lyrics.lyricslive.getLyrics(r))
            .then((r) => {
                setLyric({
                    lyrics: r
                })
            })
            .catch(console.error);
    })

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
                <div>{lyric.lyrics}</div>
            </div>
        </div>
    );
}

export default VideoDetail;