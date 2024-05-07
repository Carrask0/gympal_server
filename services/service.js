const MongoLib = require('../lib/mongo');

class Service {
    constructor() {
        this.mongoDB = new MongoLib();
        //this.populateDB();

        
    }

    async populateDB(){

        //DROP ALL DATA
        this.mongoDB.delete('exercises', {});
        this.mongoDB.delete('exercise_stats', {});
        this.mongoDB.delete('sessions', {});

        //ADD MOCK DATA
        let exercises = [ "Press de banca", "Sentadillas", "Peso muerto", "Dominadas", "Fondos en paralelas", "Curl de bíceps con barra", "Curl de bíceps con mancuernas", "Prensa de hombros", "Remo con barra", "Remo con mancuernas", "Elevaciones laterales", "Patada de tríceps", "Flexiones de pecho", "Elevaciones de gemelos", "Plancha", "Abdominales", "Sentadillas búlgaras", "Peso muerto rumano", "Zancadas", "Hip Thrust", "Burpees", "Mountain climbers", "Flexiones diamante", "Flexiones de tríceps", "Flexiones inclinadas" ];
        console.log("Adding " + exercises.length + " exercises");
        exercises.forEach(exercise => {
            this.mongoDB.create('exercises', {name: exercise});
        });
        exercises = await this.mongoDB.getAll('exercises');

        //Add exerciseStats
        exercises.forEach(exercise => {
            this.mongoDB.create('exercise_stats', {
                exerciseId: exercise._id,
                repeticionMaxima: Math.floor(Math.random() * 100) + 1,
                pesoEfectivo: Math.floor(Math.random() * 100) + 1,
                volumenTotal: Math.floor(Math.random() * 100) + 1,
            });
        });


        //Add Sessions
        const numSessions = 5;
        console.log("Adding " + numSessions + " sessions");
        for (let i = 0; i < numSessions; i++) {
            //exerciseLogs
            let exerciseLogs = [];

            for (let j = 0; j < 5; j++) {
                exerciseLogs.push({
                    exerciseId: exercises[Math.floor(Math.random() * exercises.length)]._id,
                    kgs: Math.floor(Math.random() * 100) + 1,
                    reps: Math.floor(Math.random() * 20) + 1,
                    sets: Math.floor(Math.random() * 10) + 1,
                });
            }

            this.mongoDB.create('sessions', {
                name: `Session ${i+1}`,
                date: new Date(),
                stats: {
                    puntos: Math.floor(Math.random() * 100) + 1,
                    kgsMovidos: Math.floor(Math.random() * 1000) + 1,
                    kcalsQuemadas: Math.floor(Math.random() * 1000) + 1,
                },
                exercises: exerciseLogs,
            });
        }
        console.log("FINISHED POPULATING DB")
    }
    

    async getAll(collection) {
        return this.mongoDB.getAll(collection);
    }

    async get(collection, id) {
        return this.mongoDB.get(collection, id);
    }

    async create(collection, data) {
        return this.mongoDB.create(collection, data);
    }

    async update(collection, id, data) {
        return this.mongoDB.update(collection, id, data);
    }

    async delete(collection, id) {
        return this.mongoDB.delete(collection, id);
    }
}

module.exports = Service;