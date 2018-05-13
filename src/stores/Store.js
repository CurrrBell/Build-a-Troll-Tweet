import {EventEmitter} from "events";

import dispatcher from "../dispatcher";

class Store extends EventEmitter{
    constructor(){
        super();
        this.data = [];
    }

    handleActions(action){
        if(action.type == "DATA_LOADED"){
            this.data = action.data;
            this.emit("change");
        }
    }

    getAll(){
        return this.data;
    }
}

const store = new Store;
dispatcher.register(store.handleActions.bind(store));
export default store;