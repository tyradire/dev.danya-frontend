import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ProfileGenre } from '../../models/models';

export interface collectionFilmsState {
  collection: number[],
  genres: ProfileGenre[]
}

const initialState: collectionFilmsState = {
  collection: [],
  genres: []
}

export const collectionSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setCollectionFilms(state, action: PayloadAction<any>) {
      state.collection = action.payload;
    },
    addFilmToCollection(state, action: PayloadAction<any>) {
      state.collection.push(Number(action.payload));
    },
    removeFilmFromCollection(state, action: PayloadAction<any>) {
      state.collection = state.collection.filter((movie) => movie != action.payload);
    },
    setCollectionGenres(state, action: PayloadAction<ProfileGenre[]>) {
      state.genres = action.payload;
    }
  }
})

export const { setCollectionFilms, addFilmToCollection, removeFilmFromCollection, setCollectionGenres } = collectionSlice.actions
export const collectionReducer = collectionSlice.reducer