import React, { Component } from 'react';
import TweetProcessor from './processing/TweetProcessor';
import styles from './App.css';
import WordMap from './processing/WordMap';
import Store from "./stores/Store";
import TweetEditor from './components/TweetEditor';
import WordChoice from './components/WordChoice';
import LoadingOverlay from './components/LoadingOverlay';

class App extends Component {
  constructor(){
    super();
    this.getNewChoices = this.getNewChoices.bind(this);
    this.chooseWord = this.chooseWord.bind(this);
    this.startOver = this.startOver.bind(this);
    this.state = {
      loading: true,
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
      loading: false,
      choices: Store.getChoices()
    });
  }

  render() {
    let choices = this.state.choices.map((choice) =>
      <WordChoice key={choice.text} word={choice.text} click={this.chooseWord}/>
    );

    let loadingCss = this.state.loading ? styles.Loading : styles.Loaded;
    console.log(loadingCss);
    return (
      <div className={styles.App}>
        <h1>Build A Troll Tweet</h1>
        <LoadingOverlay loading={this.state.loading} />
        <TweetEditor text={this.state.constructedTweet}/>
        <h4>Choose a word:</h4>
        <div className={styles.Choices}>
          {choices}
        </div>
        
        

        <button className={styles.StartOver} onClick={this.startOver.bind(this)}>Start Over</button>
      </div>
    );
  }
}

export default App;