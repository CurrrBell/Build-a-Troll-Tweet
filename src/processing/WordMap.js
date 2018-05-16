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

    setCurrentWord(chosenWord){
        this.currentWord = this.map.get(chosenWord).word;
    }

    clearCurrentWord(){
        this.currentWord = undefined;
    }

    getFirstWordChoices(choicesDesired = 5){
        let firstChoices = [];

        for(let i = 0; i < choicesDesired; i++){
            firstChoices.push(this.getRandomStartingWord());
        }

        return firstChoices;
    }

    getNextWordChoices(choicesDesired = 5){
        let {nextWords} = this.map.get(this.currentWord.text);
        let nextWordObjects = [];

        nextWords.forEach((key) => {
            nextWordObjects.push(this.map.get(key).word);
        });

        nextWordObjects.sort((word1, word2) => {
            return word1.getNetEngagementScore() - word2.getNetEngagementScore();
        });

        //we might not have enough choices to give, don't want to go off the edge.
        if(nextWordObjects.length < choicesDesired){
            choicesDesired = nextWordObjects.length;
        }

        return nextWordObjects.slice(0, choicesDesired);
    }

    getRandomStartingWord(){      
        return this.tweetStartingWords[Math.floor(Math.random() * this.tweetStartingWords.length)];
    }

    mapTweet(tweet){
        let stringWords = tweet.text.split(" ");
        let firstWord = this.map.has(stringWords[0]) ? this.map.get(stringWords[0]).word : new Word(stringWords[0], tweet);
        
        
        if(!this.tweetStartingWords.includes(firstWord)) 
        {
            this.tweetStartingWords.push(firstWord);
        }
        
        this.addWordsToMap(stringWords, tweet);
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