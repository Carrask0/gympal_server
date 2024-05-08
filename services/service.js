const MongoLib = require('../lib/mongo');
const { ObjectId } = require('mongodb');

class Service {
    constructor() {
        this.mongoDB = new MongoLib();
        // this.dropEvertything().then(() => {
        //     this.populateDB();
        //     console.log("DB DROPPED AND POPULATED")
        // });
    }

    async dropEvertything(){
        this.mongoDB.dropCollection('exercises');
        this.mongoDB.dropCollection('exercise_stats');
        this.mongoDB.dropCollection('sessions');
    }

    async populateDB(){

        const NUM_SESSIONS = 5;
        const EXERCISES_PER_SESSION = 5;
        const STATS_ENTRIES = 5;

        //ADD MOCK DATA
        let exercises = [ "Press de banca", "Sentadillas", "Peso muerto", "Dominadas", "Fondos en paralelas", "Curl de bíceps con barra", "Curl de bíceps con mancuernas", "Prensa de hombros", "Remo con barra", "Remo con mancuernas", "Elevaciones laterales", "Patada de tríceps", "Flexiones de pecho", "Elevaciones de gemelos", "Plancha", "Abdominales", "Sentadillas búlgaras", "Peso muerto rumano", "Zancadas", "Hip Thrust", "Burpees", "Mountain climbers", "Flexiones diamante", "Flexiones de tríceps", "Flexiones inclinadas" ];
        console.log("Adding " + exercises.length + " exercises");

        //EXERCISES 
        exercises.forEach(async exercise => {

            // New object
            let newExercise = {
                name: exercise,
                repeticionMaxima: [],
                pesoEfectivo: [],
                volumenTotal: []
            }

            //Populate stats
            for (let i = 0; i < STATS_ENTRIES; i++) {
                let date = new Date();
                date.setDate(date.getDate() - i);
                date = date.toLocaleDateString('es-ES');
                newExercise.repeticionMaxima.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
                newExercise.pesoEfectivo.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
                newExercise.volumenTotal.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
            }

            //Add exercise
            await this.mongoDB.create('exercises', newExercise);
        });

        //sleep for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));


        //SESSIONS
        let exercisesData = await this.mongoDB.getAll('exercises').then(async (exercisesData) => {
            for (let i = 0; i < NUM_SESSIONS; i++) {
                let exerciseLogs = [];
                for (let j = 0; j < EXERCISES_PER_SESSION; j++) {
                    const exercise = exercisesData[Math.floor(Math.random() * exercisesData.length)];
                    exerciseLogs.push({
                        exerciseId: exercise._id,
                        name: exercise.name,
                        kgs: Math.floor(Math.random() * 100) + 1,
                        reps: Math.floor(Math.random() * 20) + 1,
                        sets: Math.floor(Math.random() * 10) + 1,
                    });
                }

                let date = new Date();
                date.setDate(date.getDate() - i);
                date = date.toLocaleDateString('es-ES');

                this.mongoDB.create('sessions', {
                    name: `Session ${i+1}`,
                    date: date,
                    stats: {
                        puntos: Math.floor(Math.random() * 100) + 1,
                        kgsMovidos: Math.floor(Math.random() * 1000) + 1,
                        kcalsQuemadas: Math.floor(Math.random() * 1000) + 1,
                    },
                    exercises: exerciseLogs,
                });
            }
        });
    }




        // await Promise.all(exercises.map(async exercise => {
        //     //Add exercise
        //     await this.mongoDB.create('exercises', {name: exercise});
        //     //Add exercise stats for that exercise
        //     let exerciseData = await this.mongoDB.find('exercises', {name: exercise});

        //     console.log("Added exercise: " + exerciseData.name + " with id: " + exerciseData._id)
            
        //     let repeticionMaxima = [];
        //     let pesoEfectivo = [];
        //     let volumenTotal = [];

        //     for (let i = 0; i < STATS_ENTRIES; i++) {
        //         let date = new Date();
        //         date.setDate(date.getDate() - i);
        //         date = date.toLocaleDateString('es-ES');
        //         repeticionMaxima.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //         pesoEfectivo.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //         volumenTotal.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //     }

        //     console.log("    Adding stats for exercise: " + exerciseData.name + " with id: " + exerciseData._id);
            
        // }
        // )).then(async () => {
        //     //SESSIONS
        //     let exercisesData = await this.mongoDB.getAll('exercises');
        //     for (let i = 0; i < NUM_SESSIONS; i++) {
        //         let exerciseLogs = [];
        //         for (let j = 0; j < EXERCISES_PER_SESSION; j++) {
        //             const exercise = exercisesData[Math.floor(Math.random() * exercisesData.length)];
        //             exerciseLogs.push({
        //                 exerciseId: exercise._id,
        //                 name: exercise.name,
        //                 kgs: Math.floor(Math.random() * 100) + 1,
        //                 reps: Math.floor(Math.random() * 20) + 1,
        //                 sets: Math.floor(Math.random() * 10) + 1,
        //             });
        //         }

        //         let date = new Date();
        //         date.setDate(date.getDate() - i);
        //         date = date.toLocaleDateString('es-ES');

        //         this.mongoDB.create('sessions', {
        //             name: `Session ${i+1}`,
        //             date: date,
        //             stats: {
        //                 puntos: Math.floor(Math.random() * 100) + 1,
        //                 kgsMovidos: Math.floor(Math.random() * 1000) + 1,
        //                 kcalsQuemadas: Math.floor(Math.random() * 1000) + 1,
        //             },
        //             exercises: exerciseLogs,
        //         });
        //     }
        // });

        // await Promise.all(exercises.map(async exercise => {
        //     //Add exercise
        //     await this.mongoDB.create('exercises', {name: exercise});
            
        // })).then(async () => {
        //     let exercisesData = await this.mongoDB.getAll('exercises');

        //     //EXERCISE_STATS
        //     await Promise.all(exercisesData.map(exercise => {
        //         let repeticionMaxima = [];
        //         let pesoEfectivo = [];
        //         let volumenTotal = [];

        //         for (let i = 0; i < STATS_ENTRIES; i++) {
        //             let date = new Date();
        //             date.setDate(date.getDate() - i);
        //             date = date.toLocaleDateString('es-ES');
        //             repeticionMaxima.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //             pesoEfectivo.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //             volumenTotal.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //         }

        //         console.log("Adding stats for exercise: " + exercise.name + " with id: " + exercise._id);
        //         this.mongoDB.create('exercise_stats', {
        //             exerciseId: exercise._id,
        //             exerciseName: exercise.name,
        //             repeticionMaxima: repeticionMaxima,
        //             pesoEfectivo: pesoEfectivo,
        //             volumenTotal: volumenTotal,
        //         });
        //     })).then(async () => {

        //         //SESSIONS
        //         let exercisesData = await this.mongoDB.getAll('exercises');
        //         for (let i = 0; i < NUM_SESSIONS; i++) {
        //             let exerciseLogs = [];
        //             for (let j = 0; j < EXERCISES_PER_SESSION; j++) {
        //                 const exercise = exercisesData[Math.floor(Math.random() * exercisesData.length)];
        //                 exerciseLogs.push({
        //                     exerciseId: exercise._id,
        //                     name: exercise.name,
        //                     kgs: Math.floor(Math.random() * 100) + 1,
        //                     reps: Math.floor(Math.random() * 20) + 1,
        //                     sets: Math.floor(Math.random() * 10) + 1,
        //                 });
        //             }

        //             let date = new Date();
        //             date.setDate(date.getDate() - i);
        //             date = date.toLocaleDateString('es-ES');

        //             this.mongoDB.create('sessions', {
        //                 name: `Session ${i+1}`,
        //                 date: date,
        //                 stats: {
        //                     puntos: Math.floor(Math.random() * 100) + 1,
        //                     kgsMovidos: Math.floor(Math.random() * 1000) + 1,
        //                     kcalsQuemadas: Math.floor(Math.random() * 1000) + 1,
        //                 },
        //                 exercises: exerciseLogs,
        //             });
        //         }
        //     });
        // });
        
        






        // exercises.forEach(exercise => {
        //     //EXERCISES
        //     this.mongoDB.create('exercises', {name: exercise});
        // }).then(() => {
        //     //EXERCISE_STATS
        //     this.mongoDB.getAll('exercises').then((exercises) => {
        //         exercises.forEach(exercise => {
        //             let repeticionMaxima = [];
        //             let pesoEfectivo = [];
        //             let volumenTotal = [];

        //             for (let i = 0; i < STATS_ENTRIES; i++) {
        //                 let date = new Date();
        //                 date.setDate(date.getDate() - i);
        //                 date = date.toLocaleDateString('es-ES');
        //                 repeticionMaxima.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //                 pesoEfectivo.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //                 volumenTotal.push({ date: date, value: Math.floor(Math.random() * 100) + 1 });
        //             }

        //             this.mongoDB.create('exercise_stats', {
        //                 exerciseId: exercise._id,
        //                 exerciseName: exercise.name,
        //                 repeticionMaxima: repeticionMaxima,
        //                 pesoEfectivo: pesoEfectivo,
        //                 volumenTotal: volumenTotal,
        //             });
        //         });
        //     });
        // }).then(() => {
        //     //SESSIONS
        //     this.mongoDB.getAll('exercises').then((exercises) => {  
        //         for (let i; i < NUM_SESSIONS; i++) {
        //             let exerciseLogs = [];
        //             for (let j = 0; j < EXERCISES_PER_SESSION; j++) {
        //                 const exercise = exercises[Math.floor(Math.random() * exercises.length)];
        //                 exerciseLogs.push({
        //                     exerciseId: exercise._id,
        //                     name: exercise.name,
        //                     kgs: Math.floor(Math.random() * 100) + 1,
        //                     reps: Math.floor(Math.random() * 20) + 1,
        //                     sets: Math.floor(Math.random() * 10) + 1,
        //                 });
        //             }

        //             let date = new Date();
        //             date.setDate(date.getDate() - i);
        //             date = date.toLocaleDateString('es-ES');

        //             this.mongoDB.create('sessions', {
        //                 name: `Session ${i+1}`,
        //                 date: date,
        //                 stats: {
        //                     puntos: Math.floor(Math.random() * 100) + 1,
        //                     kgsMovidos: Math.floor(Math.random() * 1000) + 1,
        //                     kcalsQuemadas: Math.floor(Math.random() * 1000) + 1,
        //                 },
        //                 exercises: exerciseLogs,
        //             });
        //         }
        //     });
        // });

    

    async getAll(collection) {
        return this.mongoDB.getAll(collection);
    }

    async get(collection, query) {
        return this.mongoDB.get(collection, query);
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