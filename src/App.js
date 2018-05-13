import React, { Component } from 'react';
import TweetProcessor from './processing/TweetProcessor';
import './App.css';
import WordMap from './processing/WordMap';
import Store from "./stores/Store";

class App extends Component {
  constructor(){
    super();
    this.getData = this.getData.bind(this);
    this.state = {};
  }

  componentWillMount(){
    Store.on("change", this.getData);
  }

  componentDidMount(){
    TweetProcessor.getTweetMap();
  }

  getData(){
    this.setState({
      data: Store.getAll().size
    });
    console.log('getData() ' + this.state.data.size);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to {this.state.data || 'unknown'}.
        </p>
      </div>
    );
  }
}

export default App;