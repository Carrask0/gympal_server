const express = require('express');
const app = express();

// Load environment variables
require('dotenv').config();
const PORT = process.env.PORT;

const gympalAPI = require('./routes/gympal');

app.use(express.json());
gympalAPI(app);

var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`);
});