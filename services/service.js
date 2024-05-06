const MongoLib = require('../lib/mongo');

class Service {
    constructor() {
        this.mongoDB = new MongoLib();
    }

    async getAll(collection) {
        return this.mongoDB.getAll(collection);
    }

    //TODO: CRUD Exercise
    

    //TODO: CRUD ExerciseStats

    //TODO: CRUD ExerciseLog

    //TODO: CRUD Session

}

module.exports = Service;