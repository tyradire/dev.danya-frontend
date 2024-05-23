import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from './user/userReducer';
import { collectionReducer } from './user/collectionReducer';
import { kinopoiskApi } from "./films/api.kinopoisk";
import { interfaceReducer } from "./interface/interfaceReducer";
 
const reducers = combineReducers({
  [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
  user: userReducer,
  collection: collectionReducer,
  interface: interfaceReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(kinopoiskApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>