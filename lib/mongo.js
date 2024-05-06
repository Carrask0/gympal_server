const MongoClient = require('mongodb').MongoClient;

//Load environment variables
require('dotenv').config();
const DB_PASSWORD = process.env.PASSWORD;
const DB_USER = process.env.USER;
const DB_COLLECTION = process.env.DB_NAME;

const MONGO_URI = `mongodb+srv://jcarrasco:${DB_PASSWORD}@testcluster.fddx1ae.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`;

class MongoLib {
    constructor() {
        this.veces = 0; //DEBUG 
    }

    async connect() {
        if(MongoLib.connection != null) {
            console.log("Reusing connection");
            return MongoLib.connection.db(DB_NAME);
        } else {
            console.log("Creating connection");
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI);
                return MongoLib.connection.db(DB_NAME);
            } catch (error) {
                console.log("Error en la conexión a la BBDD", e);
                return e;
            }
        }
    }
}

module.exports = MongoLib;

