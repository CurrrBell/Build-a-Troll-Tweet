import Tweet from './Tweet';
import TweetProcessor from './TweetProcessor';
import Word from './Word';

class WordMap{  

    //WordMap is a map data structure with string representation of words
    //as keys and objects containing a Word representation of the key and
    //an array of string representations of words that come _after the key
    //in a tweet.
    //e.g. "United" => {word: Word("United"), nextWords: ["Nations", "States"]

    constructor(tweets){
        this.tweetStartingWords = [];
        this.map = new Map();
        this.currentWord;
    }

    getNextWordChoices(choicesDesired){
        let {nextWords} = this.map.get(this.currentWord.text);
        let nextWordObjects = [];

        nextWords.forEach((key) => {
            nextWordObjects.push(this.map.get(key).word);
        });

        nextWordObjects.sort((word1, word2) => {
            return word1.getNetEngagementScore() - word2.getNetEngagementScore();
        });

        return nextWordObjects.slice(0, choicesDesired);
    }

    getRandomStartingWord(){   
        console.log('starting words: ' + this.tweetStartingWords.length);     
        this.currentWord = this.tweetStartingWords[Math.floor(Math.random() * this.tweetStartingWords.length)];
    }

    mapTweet(tweet){
        let stringWords = tweet.text.split(" ");
        let firstWord = this.map.has(stringWords[0]) ? this.map.get(stringWords[0]).word : new Word(stringWords[0], tweet);
        
        //TODO: THIS IS WRONG
        this.tweetStartingWords.push(firstWord);
        
        this.addWordsToMap(stringWords, tweet);
    }

    constructWordMap(tweets){
        console.log('constructTweets(): ' + tweets.size);
        tweets.forEach((value, key, map)=>{
            let thisTweet = value;
            let stringWords = thisTweet.text.split(" ");
            let firstWord = this.map.has(stringWords[0]) ? this.map.get(stringWords[0]).word : new Word(stringWords[0], thisTweet);
            
            //TODO: THIS IS WRONG
            this.tweetStartingWords.push(firstWord);
            
            this.AddWordsToMap(stringWords, thisTweet);
        });
        console.log('constructTweets(): ' + this.map.keys().length);
    }

    addWordsToMap(stringWords, thisTweet) {
        for (let i = 0; i < stringWords.length; i++) {
            let currentStringWord = stringWords[i];
            let nextStringWord;

            if (i != stringWords.length - 1) {
                nextStringWord = stringWords[i + 1];
            }

            if (this.map.has(currentStringWord)) {
                let currentWord = this.map.get(currentStringWord);
                currentWord.word.addSourceTweet(thisTweet);

                if (nextStringWord && !currentWord.nextWords.includes(nextStringWord)) {
                    currentWord.nextWords.push(nextStringWord);
                }
            }
            else {
                this.map.set(currentStringWord, {
                    word: new Word(currentStringWord, thisTweet),
                    nextWords: []
                });
            }
        }
    }    
}

export default WordMap;