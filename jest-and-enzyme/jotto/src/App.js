import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import GuessedWords from './components/GuessedWords';
import Congrats from './components/Congrats';
import { getSecretWord } from './actions';
import Input from './components/Input';

export class UnconnectApp extends Component {

  componentDidMount() {
    this.props.getSecretWord();
  }
  

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div style={{
          marginBottom: 10
        }}>The secret word is <strong>{this.props.secretWord}</strong></div>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return {
    success,
    guessedWords,
    secretWord
  };
}

export default connect(mapStateToProps, { getSecretWord })(UnconnectApp);
