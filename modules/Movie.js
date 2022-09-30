'use strict';

const axios = require('axios');



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

module.exports = getMovies;

