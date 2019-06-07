import React, { Component } from 'react';
import SearchBar from './Components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './Components/video_list';
import VideoDetail from './Components/video_detail'; 

const API_KEY = 'AIzaSyCapDbb_bL0zI0yH21juUDJivprNg10tkI';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      videos : [],
      selectedVideo: null
    }

    this.videosearch('Con Calma');
  }

  videosearch = (term) => {
    YTSearch({key: API_KEY, term: term}, (data) => {
        this.setState({
          videos: data,
          selectedVideo: data[0]
        });
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
