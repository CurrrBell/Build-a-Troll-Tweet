import path from 'path';
import Papa from 'papaparse';
import {EventEmitter} from "events";

import dispatcher from "../dispatcher";
import Tweet from './Tweet';

class TweetProcessor{    
    static async getTweetMap(){
        let csvFile = path.join(__dirname,'..','tweets.csv');
        Papa.SCRIPT_PATH = '../node_modules/papaparse/papaparse.js';

        let tweets = new Map();

        Papa.parse(csvFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            worker: true,
            step: function(parsedRow){
                let thisTweet = new Tweet(parsedRow.data[0]);
                tweets.set(thisTweet.tweetId, thisTweet);
            },
            complete: function(){
                console.log(tweets.size);
                console.log('done parsing csv');
                dispatcher.dispatch({
                    type: "DATA_LOADED",
                    data: tweets
                });
            }
        });
    }
}

export default TweetProcessor;