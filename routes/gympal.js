const express = require('express');
const Service = require('../services/service');

function gympalAPI(app) {
    const router = express.Router();
    app.use('/api', router);
    const service = new Service();

    //TODO: CRUD Exercise

    //TODO: CRUD ExerciseStats

    //TODO: CRUD ExerciseLog

    //TODO: CRUD Session
}

module.exports = gympalAPI;