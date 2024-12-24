import {v4 as uuid} from 'uuid'

export class Todo {

    constructor(description){
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }

    get getId(){
        return this.id;
    }

    get getDescription(){
        return this.description;
    }

    get getDone(){
        return this.done;
    }

    get getCreatedAt(){
        return this.createdAt;
    }

}