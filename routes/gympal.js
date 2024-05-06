const express = require('express');
const Service = require('../services/service');

function gympalAPI(app) {
    const router = express.Router();
    app.use('/api', router);
    const service = new Service();

    //TODO: CRUD Exercise
    app.get('/exercises', async (req, res) => {
        const exercises = await service.getAll('exercises');
        res.json(exercises);
    });

    //TODO: CRUD ExerciseStats

    //TODO: CRUD ExerciseLog

    //TODO: CRUD Session

}

module.exports = gympalAPI;