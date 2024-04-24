import { IFilm } from "../models/models";

const API_KEY = 'N79852R-K1Y4AY1-PW60371-7ZGFYSH';
const SEARCH_TOP_MOVIES_QUERY = `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10`;
const SEARCH_WITH_ID = `https://api.kinopoisk.dev/v1.4/movie/`;
const SEARCH_WITH_NAME = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=20&query=`

const options = {
  method: 'GET', 
  headers: {accept: 'application/json', 'X-API-KEY': API_KEY}
};

const MOBILE_DEVICE_SIZE = 768;

const SERIES_LENGTH = 'Серия ~ ';

export {
  API_KEY, 
  SEARCH_TOP_MOVIES_QUERY,
  SEARCH_WITH_ID,
  SEARCH_WITH_NAME,
  options,
  MOBILE_DEVICE_SIZE,
  SERIES_LENGTH
}