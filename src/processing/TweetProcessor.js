import Tweet from './Tweet';
import path from 'path';
import Papa from 'papaparse';
class TweetProcessor{
    
    static getTweetArray(csvData){
        let csvFile = path.join(__dirname,'..','tweets.csv');
        //let csvFile = '../../tweets.csv';
        Papa.SCRIPT_PATH = '../node_modules/papaparse/papaparse.js';

        let tweets = [];

        Papa.parse(csvFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            worker: true,
            step: function(parsedRow){
                tweets.push(new Tweet(parsedRow.data[0]));
            },
            complete: function(){
                console.log('done');
                console.log(tweets);
            }
        });
        

        return tweets;
    }

    static processData(csvData){
        let lines = csvData.split(/\r\n|\n/);
        let headers = lines[0].split(',');
        let lineObjects = [];

        for(let i = 1; i < lines.length; i++){
            let fields = lines[i].split(',');

            if(fields.length === headers.length){
                let tmp = {};

                for(let j = 0; j < fields.length; j++){
                    tmp.headers[j] = fields[j];
                }

                lineObjects.push(tmp);
            }
        }

        console.log(lineObjects.length);
        console.log(lineObjects[0]);

        //return lineObjects;
    }

}

export default TweetProcessor;