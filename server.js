'use strict';
// This will be our server!!

// Set Up:
// --------------------

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');


const weather = require('./weather/weather.json');

// Express instance 
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

// Endpoints:
// --------------------

app.get('/weather', getWeather);

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

async function getWeather(request, response) {
  const searchQuery = request.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.searchQuery}&key=${process.env.WEATHER_API_KEY}`;

  try {
    const weather = await axios.get(url);
    console.log(response);
    const weatherArray = weather.data.data.map(day => new Forecast(day));
    response.status(200).send(weatherArray);
    console.log(weatherArray);
  } catch (error) {
    console.log(error);
  }
}

app.get('/movies', getMovies);

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

async function getMovies(request, response) {
  const searchQuery = request.query.searchQuery;
  const url1 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;

  try {
    const movies = await axios.get(url1);
    const movieArray = movies.data.results.map(movie => new Movie(movie));
    response.status(200).send(movieArray);
  } catch (error) {
    console.log(error);
  }
}







