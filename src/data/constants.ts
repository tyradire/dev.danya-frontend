import { IFilm } from "../models/models";

const API_KEY = 'N79852R-K1Y4AY1-PW60371-7ZGFYSH';
const SEARCH_TOP_MOVIES_QUERY = `https://api.kinopoisk.dev/v1.4/movie?rating.imdb=8-10`;
const SEARCH_WITH_ID = `https://api.kinopoisk.dev/v1.4/movie/`;
const SEARCH_WITH_NAME = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=20&query=`

const options = {
  method: 'GET', 
  headers: {accept: 'application/json', 'X-API-KEY': API_KEY}
};

const MOBILE_DEVICE_SIZE = 600;

const SERIES_LENGTH = 'Серия ~ ';

const initialSearchPageFilms = [
  {
    name: 'Фильм 1',
    year: 2000,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 129,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 1,
    key: 1,
    id: 1,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 2',
    year: 2002,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 62,
    rating: 8.321,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 2,
    key: 2,
    id: 2,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 3',
    year: 2003,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 123,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 3,
    key: 3,
    id: 3,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 4',
    year: 2004,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 78,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 4,
    key: 4,
    id: 4,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 5',
    year: 2005,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 111,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 5,
    key: 5,
    id: 5,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 6',
    year: 2006,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 129,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 6,
    key: 6,
    id: 6,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 7',
    year: 2007,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 221,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 7,
    key: 7,
    id: 7,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 8',
    year: 2008,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 324,
    rating: 9,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 8,
    key: 8,
    id: 8,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 9',
    year: 2009,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 129,
    rating: 8,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 9,
    key: 9,
    id: 9,
    isSeries: false,
    isLiked: false
  },
  {
    name: 'Фильм 10',
    year: 2010,
    genres: [{
      name: 'комедия'
    },
    {
      name: 'драма'
    }], 
    movieLength: 37,
    rating: 9,
    poster: 'https://upload.wikimedia.org/wikipedia/ru/6/6f/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%81%D0%BB%D0%BA%D0%B8_%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5%C2%BB.jpg',
    top: 10,
    key: 10,
    id: 10,
    isSeries: false,
    isLiked: false
  }
]

export {
  API_KEY, 
  SEARCH_TOP_MOVIES_QUERY,
  SEARCH_WITH_ID,
  SEARCH_WITH_NAME,
  options,
  MOBILE_DEVICE_SIZE,
  SERIES_LENGTH,
  initialSearchPageFilms
}