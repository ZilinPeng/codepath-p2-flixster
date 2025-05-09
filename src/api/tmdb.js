import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchNowPlaying = (page = 1) =>
  axios.get(`${BASE_URL}/movie/now_playing`, {
    params: { api_key: API_KEY, page }
  }).then(res => res.data);

export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page }
  }).then(res => res.data);

export const fetchMovieDetails = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, append_to_response: 'videos' }
  }).then(res => res.data);