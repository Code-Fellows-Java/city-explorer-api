'use strict';

const axios = require('axios');

const cache = require('./cache.js');

class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
  }
}

async function getWeather(request, response) {
  const searchQuery = request.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.searchQuery}&key=${process.env.WEATHER_API_KEY}&days=1`;

  try {
    const key = 'weather' + searchQuery;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      
      response.status(200).send(cache[key]);
    } else {
      const weather = await axios.get(url);
      
      const weatherArray = weather.data.data.map(day => new Forecast(day));
      response.status(200).send(weatherArray);
      cache[key] = {
        timeStamp: Date.now(),
        data: weatherArray,
      }
      console.log('Cache hit:', cache[key]);
      console.log('Cache miss:', cache[key]);
    }


  } catch (error) {
    console.log(error);
  }
}

module.exports = getWeather;