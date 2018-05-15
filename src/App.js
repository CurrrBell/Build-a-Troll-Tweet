import React, { Component } from 'react';
import TweetProcessor from './processing/TweetProcessor';
import './App.css';
import WordMap from './processing/WordMap';
import Store from "./stores/Store";

class App extends Component {
  constructor(){
    super();
    this.getData = this.getData.bind(this);
    this.state = {
      currentWord: "",
      choices: []
    }
  }

  componentWillMount(){
    Store.on("loaded", this.getData);
  }

  componentDidMount(){
    console.log('componentDidMount()');
    TweetProcessor.getTweetMap();    
  }

  getData(){
    console.log('App.getData() start');
    this.setState({
      currentWord: Store.getCurrentWord(),
      choices: Store.getChoices()
    });
    console.log('App.getData() finish');
  }

  getNewChoices(){
    this.setState({
      choices: Store.getChoices()
    });
    console.log(this.state);
  }

  render() {
    console.log('render()');
    let choices = this.state.choices.map((choice) =>
      <li key={choice.text}>{choice.text}</li>
    );

    console.log(choices);
    console.log(this.state.choices);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to {this.state.currentWord.text}.
          
        </p>
        <ul>
          {choices}
        </ul>

        <button onClick={this.getNewChoices.bind(this)}>Get New Choices</button>
      </div>
    );
  }
}

export default App;