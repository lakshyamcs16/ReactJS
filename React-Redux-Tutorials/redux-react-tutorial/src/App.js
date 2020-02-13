import React, { Component } from 'react';
import './App.css';
import RandomTextContainer from './components/RandomTextContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: null
    }
  }

  clearText = () => {
    this.setState({
      text: null
    })
  }

  setText = (text) => {
    this.setState({
      text: text
    })
  }

  render() {
    return (
      // <Provider store={store}> 
        <div className="App">
          {/* <UsersContainer /> */}
          {/* <HooksCakeContainer />
          <IceCreamContainer />
          <CakeContainer /> */}
          <RandomTextContainer text={this.state.text} clear={this.clearText} set={this.setText} />
        </div>       
      // </Provider>
      
    );
  }
}

export default App;
