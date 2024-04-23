import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import filmsReducer from '../filmsState';
import filmSaga from "../filmsSaga";
import { kinopoiskApi } from "./films/api.kinopoisk";

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware)
});