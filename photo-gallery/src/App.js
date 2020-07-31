import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store from './redux/store'; 
import Gallery from './components/Gallery';

function App() {
  return (
    <Provider store={store}> 
      <div className="App">
        <Gallery />
      </div>
    </Provider>
  );
}

export default App;
