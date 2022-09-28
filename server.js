'use strict';
// This will be our server!!

// Set Up:
// --------------------

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const weather = require('./weather/weather.json');

const app = express();


app.use(cors());

// Declare our PORT variable
const PORT = process.env.PORT || 3001;

// Listening for connection
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Endpoints:
// --------------------

app.get('/weather', (req, res) => {
  // sends a response
  res.send(weather[0].city_name + ' ' + weather[0].lat + ' ' + weather[0].lon + ' ' + weather[0].timezone + ' ');
});

app.get('/weather', (req, res) => {
  // sends a response
  res.send(weather[1].city_name + ' ' + weather[1].lat + ' ' + weather[1].lon + ' ' + weather[1].timezone + ' ');
});

app.get('/weather', (req, res) => {
  // sends a response
  res.send(weather[2].city_name + ' ' + weather[2].lat + ' ' + weather[2].lon + ' ' + weather[2].timezone + ' ');
});


// Catch all endpoint:

app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});
