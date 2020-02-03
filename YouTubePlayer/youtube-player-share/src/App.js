import React, { Component } from 'react';
import {Provider} from 'react-redux';
import './App.css';
import store from './Redux/store'; 
import YTShare from './Components/YTShare'

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <div className="App">
          <YTShare />
          {/* <HooksCakeContainer />
          <IceCreamContainer />
          <CakeContainer /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
