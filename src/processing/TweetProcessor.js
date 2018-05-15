import path from 'path';
import Papa from 'papaparse';
import {EventEmitter} from "events";

import dispatcher from "../Dispatcher";
import Tweet from './Tweet';
import WordMap from './WordMap';

class TweetProcessor{    
    static getTweetMap(){
        let csvFile = path.join(__dirname,'..','tweets.csv');
        Papa.SCRIPT_PATH = '../node_modules/papaparse/papaparse.js';

        let tweets = new Map();
        let wordMap = new WordMap();
        console.log('begin parse/construction');

        Papa.parse(csvFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            worker: true,
            step: function(parsedRow){
                let thisTweet = new Tweet(parsedRow.data[0]);
                tweets.set(thisTweet.tweetId, thisTweet);
                wordMap.mapTweet(thisTweet);
            },
            complete: function(){
                console.log(tweets.size);
                console.log('done parsing csv');
                wordMap.getRandomStartingWord();
                dispatcher.dispatch({
                    type: "DATA_LOADED",
                    data: {
                        tweets: tweets,
                        wordMap: wordMap
                    }
                });
            }
        });
    }
}

export default TweetProcessor;