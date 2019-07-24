import React, { Component } from 'react'; 
import './bulma.css';
import './App.css';
import SpeechRecognition from './SpeechRecognition.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="hero-head">
          <header className="hero is-link is-bold">
            <div className="hero-body">
              <div className="container">
                <p className="title">
                  Instant Interviewer
                </p>
                <p className="subtitle">
                  I am listening, speak! I will try to understand you and correct your grammer mistakes.
                </p>
              </div>
            </div>
          </header>
        </div>
        <SpeechRecognition></SpeechRecognition>
      </div>
    );
  }
}

export default App;
