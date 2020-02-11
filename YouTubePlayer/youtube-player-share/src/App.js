import React, { Component } from 'react';
import SearchBar from './Components/search_bar';
import searchYoutube from 'youtube-api-v3-search';
const YTPlayer = require('yt-player')
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_detail';
import ContentLoader from 'react-content-loader'



const API_KEY = 'AIzaSyBdUY8BLhNYn7OLEd_e7gAVQ_2Mz7_FyDI';
const opts = {
  width: 990,
  height: 615,
  autoplay: true,
  keyboard: true
}
var player;

const MyLoader = () => (
  <ContentLoader viewBox="0 0 380 70" className="list_placeholders">
    {/* Only SVG shapes */}    
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videos : [],
      selectedVideo: null,
      isFirstVideo: true
    }

    this.videosearch('IDGAF');
  }

  setPlayer() {
    if(this.state.isFirstVideo)
      player = new YTPlayer('#player', opts);

    player.load(this.state.selectedVideo.id.videoId);
    player.setVolume(100);
    player.play()
    player.on('ended', () => {
      player.load(this.state.selectedVideo.id.videoId, true);
    })
  }
  
  videosearch = (term) => {
    searchYoutube(API_KEY, {part: 'snippet', type: 'video', q: term}, (code, data) => {
        console.log(data);
        this.setState({
          //videos: data.items,
          selectedVideo: data.items[0]
        }, this.setPlayer);
    });
  }

  getVideoListTemplate() {
    var items = [];
    for(var i =0; i < 5; i++) {
      items.push(MyLoader())
    }
    return items;
  }

  render() {
    return (
      <div>
      <SearchBar onSearchTermChange={searchTerm => this.videosearch(searchTerm)}/>
      <VideoDetail video={this.state.selectedVideo}></VideoDetail>
      
      {
        this.state.videos.length === 0 ?
            <ul className="col-md-4 list-group">
              {this.getVideoListTemplate()}
            </ul>
        :
        <VideoList 
          onVideoSelect={userSelected => this.setState({ selectedVideo: userSelected, isFirstVideo: false }, this.setPlayer)}
          videos={this.state.videos}></VideoList>
      }
      </div>
    );
  }
}

export default App;
