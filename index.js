const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// // Serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'static/frontend')));

// // Handle all other routes and serve the index.html file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'static/frontend', 'index.html'));
// });

// Load environment variables
const PORT = process.env.PORT;

const gympalAPI = require('./routes/gympal');
gympalAPI(app);

var server = app.listen(PORT, () => {
    console.log(`servidor escuchando en ${server.address().port}`);
});

