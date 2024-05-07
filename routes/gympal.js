const express = require('express');
const Service = require('../services/service');

function gympalAPI(app) {
    const router = express.Router();
    app.use('/api', router);
    const service = new Service();

    // EXERCISES
    app.get('/exercises', async (req, res) => {
        try {
            const exercises = await service.getAll('exercises');
            if (exercises.length === 0) {
                console.log("No exercises found");
                res.status(404).json({ error: 'Exercises not found' }).sucess(true);
            } else {
                console.log("Exercises found");
                res.status(200).json({success: true, exercises});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving exercises' });
        }
    });

    app.get('/exercises/:id', async (req, res) => {
        try {
            const exercise = await service.get('exercises', req.params.id);
            if (exercise === null) {
                console.log("Exercise not found");
                res.status(404).json({ error: 'Exercise not found' });
            } else {
                console.log("Exercise found");
                res.status(200).json({success: true, exercise});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving exercise' });
        }
    });


    // EXERCISE_STATS
    app.get('/exercise_stats', async (req, res) => {
        try {
            const exerciseStats = await service.getAll('exercise_stats');
            if (exerciseStats.length === 0) {
                console.log("No exercise stats found");
                res.status(404).json({ error: 'Exercise stats not found' });
            } else {
                console.log("Exercise stats found");
                res.status(200).json({success: true, exerciseStats});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving exercise stats' });
        }
    });

    app.get('/exercise_stats/:id', async (req, res) => {
        try {
            const exerciseStat = await service.get('exercise_stats', req.params.id);
            if (exerciseStat === null) {
                res.status(404).json({ error: 'Exercise stat not found' });
            } else {
                res.status(200).json({success: true, exerciseStat});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error retrieving exercise stat' });
        }
    });
 
    // SESSIONS
    app.get('/sessions', async (req, res) => {
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

    app.get('/sessions/:id', async (req, res) => {
        try {
            const session = await service.get('sessions', req.params.id);
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

    app.post('/sessions', async (req, res) => {
        try {
            const session = req.body;
            await service.create('sessions', session);
            res.status(201).json({success: true, session});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating session' });
        }
    });

    app.put('/sessions/:id', async (req, res) => {
        try {
            const session = req.body;
            await service.update('sessions', req.params.id, session);
            res.status(200).json({success: true, session});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating session' });
        }
    });
}

module.exports = gympalAPI;