import React, { Component } from 'react';
import TweetProcessor from './processing/TweetProcessor';
import './App.css';
import WordMap from './processing/WordMap';
import Store from "./stores/Store";
import TweetEditor from './components/TweetEditor';
import WordChoice from './components/WordChoice';

class App extends Component {
  constructor(){
    super();
    this.getNewChoices = this.getNewChoices.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.startOver = this.startOver.bind(this);
    this.state = {
      constructedTweet: "",
      choices: []
    }
  }

  componentWillMount(){
    Store.on("loaded", this.getNewChoices);
  }

  componentDidMount(){
    TweetProcessor.getTweetMap();    
  }

  chooseWord(e){
    let word = e.target.innerHTML;
    let tweetPlusWord = this.state.constructedTweet + ' ' + word;

    this.setState({
      constructedTweet: tweetPlusWord,
      choices: Store.chooseWord(word)
    });

    //add chosen word to tweetEditor
  }

  startOver(){
    Store.startOver();
    this.setState({
      constructedTweet: ""
    });
    this.getNewChoices();
  }

  getNewChoices(){
    this.setState({
      choices: Store.getChoices()
    });
  }

  render() {
    let choices = this.state.choices.map((choice) =>
      <WordChoice key={choice.text} word={choice.text} click={this.chooseWord}/>
    );
    return (
      <div className="App">
        <TweetEditor text={this.state.constructedTweet}/>
        <ul>
          {choices}
        </ul>

        <button onClick={this.startOver.bind(this)}>Start Over</button>
      </div>
    );
  }
}

export default App;