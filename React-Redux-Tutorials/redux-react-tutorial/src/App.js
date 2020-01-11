import React, { Component } from 'react';
import {Provider} from 'react-redux';
import './App.css';
import store from './redux/store'; 
import HooksCakeContainer from './components/HooksCakeContainer';
import IceCreamContainer from './components/IceCreamContainer';
import CakeContainer from './components/CakeContainer';
import UsersContainer from './components/UsersContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <div className="App">
          <UsersContainer />
          {/* <HooksCakeContainer />
          <IceCreamContainer />
          <CakeContainer /> */}
        </div>
      </Provider>
    );
  }
}

export default App;
