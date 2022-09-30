'use strict';
// This will be our server!!

// Set Up:
// --------------------

require('dotenv').config();

const express = require('express');
const cors = require('cors');



// Express instance 
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

const getWeather = require('./modules/Weather.js');
const getMovies = require('./modules/Movie.js');

// Endpoints:
// --------------------

app.get('/weather', getWeather);

app.get('/movies', getMovies);









