import { call, put, takeEvery } from 'redux-saga/effects';
import { options, SEARCH_TOP_MOVIES_QUERY } from './data/constants';
import { getFilmsSuccess } from './filmsState';

function* workGetFilmsFetch(): any {
  const films = yield call(() => fetch(SEARCH_TOP_MOVIES_QUERY, options));
  const formattedFilms = yield films.json();
  yield put(getFilmsSuccess(films))
}

function* filmSaga() {
  yield takeEvery('films/getFilmsFetch', workGetFilmsFetch);
}

export default filmSaga;