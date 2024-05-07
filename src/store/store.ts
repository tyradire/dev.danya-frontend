import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from './user/userReducer';
import { kinopoiskApi } from "./films/api.kinopoisk";
 
const reducers = combineReducers({
  [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  user: userReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>