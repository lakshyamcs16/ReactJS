import React, { Component } from 'react';
import SearchBar from './Components/search_bar';
import searchYoutube from 'youtube-api-v3-search';
const YTPlayer = require('yt-player')
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_detail'; 

const API_KEY = 'AIzaSyBdUY8BLhNYn7OLEd_e7gAVQ_2Mz7_FyDI';
const opts = {
  width: 1100,
  height: 615,
  autoplay: true,
  keyboard: true
}
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videos : [],
      selectedVideo: null
    }

    this.videosearch('IDGAF');
  }

  setPlayer() {
    const player = new YTPlayer('#player', opts);

    player.load(this.state.selectedVideo.id.videoId);
    player.setVolume(100);
    player.on('ended', () => {
      player.load(this.state.selectedVideo.id.videoId, true);
    })
  }
  
  videosearch = (term) => {
    searchYoutube(API_KEY, {part: 'snippet', type: 'video', q: term}, (code, data) => {
        console.log(data);
        this.setState({
          videos: data.items,
          selectedVideo: data.items[0]
        }, this.setPlayer);
    });
  }

  render() {
    return (
      <div>
      <SearchBar onSearchTermChange={searchTerm => this.videosearch(searchTerm)}/>
      <VideoDetail video={this.state.selectedVideo}></VideoDetail>
      <VideoList 
        onVideoSelect={userSelected => this.setState({ selectedVideo: userSelected })}
        videos={this.state.videos}></VideoList>
      </div>
    );
  }
}

export default App;
