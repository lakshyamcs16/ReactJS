import React,  { useState, useEffect } from 'react';
const Lyrics = require('slyrics')
const lyrics = new Lyrics()

async function test (provider, title) {
    const start = new Date().getTime()
    const result = await lyrics.get(provider, title)
    console.log(result)
    console.log(result.result)
    console.log(new Date().getTime() - start + 'ms')
}

const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&apikey=dba33df1deeef4f0955942ffc89d0185&q_track='
const VideoDetail = (props) => {
    const video = props.video;
    const [lyric, setLyric] = useState({lyrics: null});

    useEffect(()=>{
        test('melon', 'idgaf')
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