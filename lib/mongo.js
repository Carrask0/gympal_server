const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

//Load environment variables
require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


const MONGO_URI = `mongodb+srv://jcarrasco:${DB_PASSWORD}@testcluster.fddx1ae.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

class MongoLib {
    constructor() {
        this.veces = 0; //DEBUG 
    }

    async connect() {
        if(MongoLib.connection != null) {
            return MongoLib.connection.db(DB_NAME);
        } else {
            //console.log("Creating connection");
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI);
                return MongoLib.connection.db(DB_NAME);
            } catch (e) {
                console.log("Error en la conexión a la BBDD", e);
                return e;
            }
        }
    }

    async getAll(collection) {
        const db = await this.connect();
        return db.collection(collection).find({}).toArray();
    }

    async get(collection, query = {}) {
        const db = await this.connect();
        return db.collection(collection).findOne(query);
    }

    async create(collection, data) {
        const db = await this.connect();
        return db.collection(collection).insertOne(data);
    }

    async update(collection, id, data) {
        const db = await this.connect();
        return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true });
    }

    async delete(collection, id) {
        const db = await this.connect();
        return db.collection(collection).deleteOne({ _id: new ObjectId(id)});
    }

    async dropCollection(collection) {
        const db = await this.connect();
        return db.collection(collection).drop();
    }
}

module.exports = MongoLib;

