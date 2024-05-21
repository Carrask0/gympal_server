const express = require('express');
const Service = require('../services/service');
const { ObjectId } = require('mongodb');

function gympalAPI(app) {
    const router = express.Router();
    app.use('/api', router);
    const service = new Service();

    // GET ALL EXERCISES
    app.get('/api/exercises', async (req, res) => {
        try {
            const exercises = await service.getAll('exercises');
            if (exercises.length === 0) {
                res.status(404).json({ error: 'Exercises not found' }).sucess(true);
            } else {
                res.status(200).json({success: true, exercises});
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving exercises' });
        }
    });

    // GET EXERCISE BY ID
    app.get('/api/exercises/:id', async (req, res) => {
        try {
            const exercise = await service.get('exercises', { _id: new ObjectId(req.params.id) });
            if (exercise === null) {
                res.status(404).json({ error: 'Exercise not found' });
            } else {
                res.status(200).json({success: true, exercise});
            }
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving exercise' });
        }
    });
 
    // GET ALL SESSIONS
    app.get('/api/sessions', async (req, res) => {
        try {
            const sessions = await service.getAll('sessions');
            if (sessions.length === 0) {
                res.status(404).json({ error: 'Sessions not found' });
            } else {
                res.status(200).json({success: true, sessions});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving sessions' });
        }
    });

    // GET SESSION BY ID
    app.get('/api/sessions/:id', async (req, res) => {
        try {
            console.log("Fetching session with id: ", req.params.id)
            const session = await service.get('sessions', { _id: new ObjectId(req.params.id) });
            if (session === null) {
                res.status(404).json({ error: 'Session not found' });
            } else {
                res.status(200).json({success: true, session});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving session' });
        }
    });

    // CREATE SESSION
    app.post('/api/sessions', async (req, res) => {
        console.log("Creating session");
        console.log(req.body)
        try {
            const data = req.body;
            // Extract the fields from the data object, excluding _id
            const { _id, ...updatedData } = data;
            console.log(updatedData)
            await service.create('sessions', updatedData);
            res.status(201).json({success: true, updatedData});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating session' });
        }
    });

    // UPDATE SESSION
    app.put('/api/sessions/:id', async (req, res) => {
        try {
            const session = req.body;
            // Extract the fields from the data object, excluding _id
            const { _id, ...updateData } = session;
            await service.update('sessions', req.params.id, updateData);
            res.status(200).json({success: true, session});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating session' });
        }
    });
}

module.exports = gympalAPI;