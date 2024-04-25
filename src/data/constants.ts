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

const initialSearchPageFilms = `[{"internalNames":["1","1","1: One Life on the Limit","1: One - Leben am Limit","1: Life on the Limit","伝説のレーサーたち 命をかけた戦い","伝説のレーサーたち－命をかけた戦い－"],"name":"1","alternativeName":"1","enName":"","year":2013,"genres":[{"name":"документальный"},{"name":"спорт"},{"name":"история"}],"countries":[{"name":"США"}],"releaseYears":[],"id":794704,"externalId":{"imdb":"tt2518788","tmdb":217316},"names":[{"name":"1"},{"name":"1"},{"name":"1: One Life on the Limit","language":"US","type":null},{"name":"1: One - Leben am Limit","language":"DE","type":null},{"name":"1: Life on the Limit","language":"GB","type":null},{"name":"伝説のレーサーたち 命をかけた戦い","language":"JP","type":null},{"name":"伝説のレーサーたち－命をかけた戦い－","language":"JP","type":null}],"type":"movie","description":"Документальный фильм, который показывает очарование, скорость, опасность и волнение гонок гран-при Формулы 1. Фильм показывает историю Золотого века Формулы 1, когда спорт был ужасающе опасным. В конце 1960-х, на болидах Формулы 1 удвоился объем двигателя и выросли крылья, что сделало их не только невероятно быстрыми, но и еще более опасными. С приходом больших денег от спонсоров и новой международной телевизионной аудиторией, родились звёздные пилоты, брошенные как гладиаторы на ринг. Фильм следует за историей гонщиков, которые боролись на грани, и тех, кто восстал, чтобы изменить спорт навсегда.","shortDescription":"","logo":{"url":null},"poster":{"url":"https://image.openmoviedb.com/kinopoisk-images/1599028/265ce17b-30d0-40e9-b146-3445e6d32c35/orig","previewUrl":"https://image.openmoviedb.com/kinopoisk-images/1599028/265ce17b-30d0-40e9-b146-3445e6d32c35/x1000"},"backdrop":{"url":"https://image.openmoviedb.com/tmdb-images/original/nPqDbXYaMhR2XKQ9IU8bkX7YgO7.jpg","previewUrl":"https://image.openmoviedb.com/tmdb-images/w500/nPqDbXYaMhR2XKQ9IU8bkX7YgO7.jpg"},"rating":{"kp":8.358,"imdb":7.9,"filmCritics":0,"russianFilmCritics":0,"await":null},"votes":{"kp":2638,"imdb":4445,"filmCritics":0,"russianFilmCritics":0,"await":6},"movieLength":112,"internalRating":8.358,"internalVotes":2638,"isSeries":false,"ticketsOnSale":false,"totalSeriesLength":null,"seriesLength":null,"ratingMpaa":null,"ageRating":null,"top10":null,"top250":null,"typeNumber":1,"status":null}]`

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