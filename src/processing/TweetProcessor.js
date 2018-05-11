import Tweet from './Tweet';
//import csv from 'csvtojson';
//import csv from 'csv-parser';
//import read from 'file-reader';
//import fs from 'fs';

//import fs from 'browserify-fs';
import path from 'path';
import papa from 'papaparse';
//import data from "./tweets.json";


class TweetProcessor{
    
    static getTweetArray(csvData){
        let csvFile = path.join(__dirname,'..','tweets.csv');

        papa.parse(csvFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(data){
                console.log(data);
            }
        });
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