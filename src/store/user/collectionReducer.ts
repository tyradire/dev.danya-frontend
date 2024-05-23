import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface collectionFilmsState {
  collection: number[]
}

const initialState: collectionFilmsState = {
  collection: []
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
    }
  }
})

export const { setCollectionFilms, addFilmToCollection, removeFilmFromCollection } = collectionSlice.actions
export const collectionReducer = collectionSlice.reducer