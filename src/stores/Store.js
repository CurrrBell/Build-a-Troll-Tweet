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
        if(this.wordMap){
            return this.wordMap.getNextWordChoices(5);
        }
        return [];
    }
}

const store = new Store;
dispatcher.register(store.handleActions.bind(store));
export default store;