const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Load environment variables
const PORT = process.env.PORT;

const gympalAPI = require('./routes/gympal');
gympalAPI(app);

var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`);
});