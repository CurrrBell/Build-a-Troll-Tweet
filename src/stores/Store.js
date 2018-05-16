import {EventEmitter} from 'events';

import dispatcher from '../Dispatcher';
class Store extends EventEmitter{
    constructor(){
        super();
    }

    handleActions(action){
        if(action.type === "DATA_LOADED"){
            console.log("handleActions() " + action.type);
            this.tweets = action.data.tweets;
            this.wordMap = action.data.wordMap;
            this.emit("loaded");
        }
    }

    getCurrentWord(){
        return this.wordMap.currentWord;
    }

    getChoices(){
        console.log('getChoices()');
        if(this.wordMap){            
            if(this.wordMap.currentWord){
                console.log(this.wordMap.currentWord);
                return this.wordMap.getNextWordChoices();
            }
            return this.wordMap.getFirstWordChoices();
        }

        return [];
    }

    chooseWord(word){
        this.wordMap.setCurrentWord(word);
        return this.wordMap.getNextWordChoices();
    }

    startOver(){
        this.wordMap.clearCurrentWord();
    }
}

const store = new Store;
dispatcher.register(store.handleActions.bind(store));
export default store;