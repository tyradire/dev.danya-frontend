import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from './user/userReducer';
import { likedReducer } from './user/likedReducer';
import { kinopoiskApi } from "./films/api.kinopoisk";
 
const reducers = combineReducers({
  [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  user: userReducer,
  liked: likedReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>