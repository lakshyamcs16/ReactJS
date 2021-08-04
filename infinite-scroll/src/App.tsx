import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes/Routes';

function App(): React.ReactElement {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
