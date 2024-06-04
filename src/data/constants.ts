const SEARCH_TOP_MOVIES_QUERY = `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10`;
const SEARCH_WITH_ID = `https://api.kinopoisk.dev/v1.4/movie/`;
const SEARCH_WITH_NAME = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=20&query=`

const options = {
  method: 'GET', 
  headers: {accept: 'application/json', 'X-API-KEY': process.env.API_KEY}
};

const MOBILE_DEVICE_SIZE = 600;

const SERIES_LENGTH = 'Серия ~ ';

const HOME_ROUTE = '/'
const LOGIN_ROUTE = '/login';
const REGISTRATION_ROUTE = '/registration';
const COLLECTION_ROUTE = '/collection';
const SEARCH_ROUTE = '/search';
const MOVIE_ROUTE = '/search/:id';
const PROFILE_ROUTE = '/profile';
const PERSON_ROUTE = '/person/:id';


export {
  SEARCH_TOP_MOVIES_QUERY,
  SEARCH_WITH_ID,
  SEARCH_WITH_NAME,
  options,
  MOBILE_DEVICE_SIZE,
  SERIES_LENGTH,

  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  COLLECTION_ROUTE,
  SEARCH_ROUTE,
  MOVIE_ROUTE,
  PROFILE_ROUTE,
  PERSON_ROUTE
}