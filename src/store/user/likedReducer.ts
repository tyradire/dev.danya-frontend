import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface likedFilmsState {
  liked: number[]
}

const initialState: likedFilmsState = {
  liked: []
}

export const likedSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setLikedFilms(state, action: PayloadAction<any>) {
      state.liked = action.payload;
    },
    addFilmToLiked(state, action: PayloadAction<any>) {
      state.liked.push(action.payload);
    },
    removeFilmFromLiked(state, action: PayloadAction<any>) {
      state.liked.filter((movie) => movie !== action.payload);
    }
  }
})

export const { setLikedFilms, addFilmToLiked, removeFilmFromLiked } = likedSlice.actions
export const likedReducer = likedSlice.reducer