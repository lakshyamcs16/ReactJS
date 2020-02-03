import React, { Component } from 'react';
import SearchBar from './Videos/search_bar';
import searchYoutube from 'youtube-api-v3-search';
const YTPlayer = require('yt-player')
import VideoList from './Videos/video_list';
import VideoDetail from './Videos/video_detail'; 
import {setFirstVideo, setSelectedVideo, setupPlayer} from '../Redux';
import {connect} from 'react-redux';


const API_KEY = 'AIzaSyBdUY8BLhNYn7OLEd_e7gAVQ_2Mz7_FyDI';
const opts = {
  width: 1100,
  height: 615,
  autoplay: true,
  keyboard: true
}
var player;
class YTShare extends Component {
  constructor(props) {
    super(props);
    this.videosearch('IDGAF');
  }

  setPlayer() {
    if(this.props.isFirstVideo)
      player = new YTPlayer('#player', opts);

    player.load(this.props.selectedVideo.id.videoId);
    player.setVolume(100);
    player.on('ended', () => {
      player.load(this.props.selectedVideo.id.videoId, true);
    })
  }
  
  videosearch = (term) => {
    const { dispatch } = this.props;  
    searchYoutube(API_KEY, {part: 'snippet', type: 'video', q: term}, (code, data) => {
        console.log(data);
        if(data)
            dispatch(setupPlayer(data.items, data.items[0], true, this.setPlayer))
    });
  }

  render() {
    return (
        <div>
        <SearchBar onSearchTermChange={searchTerm => this.videosearch(searchTerm)}/>
        <VideoDetail video={this.props.selectedVideo}></VideoDetail>
        <VideoList 
          onVideoSelect={
            userSelected => {
            this.props.dispatch(setSelectedVideo(userSelected)); 
            this.props.dispatch(setFirstVideo(false)); 
            this.setPlayer();
          }}
          videos={this.props.videos}></VideoList>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      videos: state.videosReducer.videos,
      selectedVideo: state.videosReducer.selectedVideo,
      isFirstVideo: state.videosReducer.isFirstVideo
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//       setFirstVideo: () => dispatch(setFirstVideo()),
//       setSelectedVideo: () => dispatch(setSelectedVideo()),
//       setVideos: () => dispatch(setVideos()),
//       setupPlayer: () => dispatch(setupPlayer())
//   }
// }


export default connect(mapStateToProps)(YTShare);