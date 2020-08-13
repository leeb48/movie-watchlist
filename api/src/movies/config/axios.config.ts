import axios from 'axios';

export const moviesAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}` },
});
