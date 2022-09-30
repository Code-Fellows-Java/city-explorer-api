'use strict';

const axios = require('axios');

class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    }
  }
  
  async function getWeather(request, response) {
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${request.query.searchQuery}&key=${process.env.WEATHER_API_KEY}&days=1`;
  
    try {
      const weather = await axios.get(url);
      console.log(weather);
      const weatherArray = weather.data.data.map(day => new Forecast(day));
      console.log(weatherArray);
      response.status(200).send(weatherArray);
    } catch (error) {
      console.log(error);
    }
  }

module.exports = getWeather;